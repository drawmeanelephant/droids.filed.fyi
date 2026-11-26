const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const script = fs.readFileSync(path.join(root, "manila/assets/js/manila.js"), "utf8");
const css = fs.readFileSync(path.join(root, "manila/assets/css/manila.css"), "utf8");

class Element {
  constructor(tagName = "div") {
    this.tagName = tagName.toUpperCase();
    this.children = [];
    this.attributes = new Map();
    this.listeners = new Map();
    this.dataset = {};
    this.hidden = false;
    this.value = "";
    this.open = false;
    this._text = "";
  }
  setAttribute(key, value) { this.attributes.set(key, String(value)); }
  getAttribute(key) { return this.attributes.get(key) ?? null; }
  removeAttribute(key) { this.attributes.delete(key); }
  append(...children) { this.children.push(...children); }
  replaceChildren(...children) { this.children = [...children]; this._text = ""; }
  set textContent(value) { this._text = String(value); this.children = []; }
  get textContent() {
    return this._text + this.children.map(c => typeof c === "string" ? c : c.textContent).join("");
  }
  addEventListener(type, handler) {
    const handlers = this.listeners.get(type) || [];
    handlers.push(handler);
    this.listeners.set(type, handlers);
  }
  async emit(type, event = {}) {
    await Promise.all((this.listeners.get(type) || []).map(fn =>
      fn({ target: this, preventDefault() {}, ...event }),
    ));
  }
  querySelector(selector) {
    if (selector.startsWith("#pr-")) {
      return this.children.find(li => li.id === selector.split(" ")[0].slice(1))?.children[0] || null;
    }
    return null;
  }
  scrollIntoView() {}
  select() {}
  showModal() { this.open = true; }
  close() { this.open = false; this.emit("close"); }
}

function palette(fetch) {
  const input = new Element("input");
  const list = new Element("ul");
  const status = new Element("p");
  const close = new Element("button");
  const dialog = new Element("dialog");
  const opener = new Element("button");
  dialog.querySelector = selector => ({
    input, ".palette__results": list, ".palette__status": status,
    "[data-palette-close]": close,
  })[selector] || null;
  const document = {
    documentElement: new Element("html"),
    currentScript: { src: "https://example.test/blog/assets/js/manila.js" },
    activeElement: input,
    querySelector: selector => selector === "[data-palette-open]" ? opener : null,
    querySelectorAll: () => [],
    getElementById: id => id === "palette" ? dialog : null,
    createElement: tag => new Element(tag),
    addEventListener() {},
  };
  vm.runInNewContext(script, { document, fetch, URL, navigator: {}, location: {}, setTimeout });
  const settle = () => new Promise(resolve => setImmediate(resolve));
  return {
    input, list, status, close, dialog, opener,
    async open() { await opener.emit("click"); await settle(); },
    async query(value) { input.value = value; await input.emit("input"); await settle(); },
  };
}

const documents = [{
  title: "Boris builds", path: "builds/boris.html",
  sections: [{ heading: "Receipts", text: "The Boris compiler build.", fragment: "receipts" }],
}];
const response = (docs = documents) => ({ ok: true, json: async () => ({ documents: docs }) });

test("search results resolve beneath the publication base", async () => {
  const p = palette(async url => {
    assert.equal(url.href, "https://example.test/blog/_boris/search/search-index.json");
    return response();
  });
  await p.open();
  await p.query("boris");
  assert.equal(p.list.children.length, 1);
  assert.equal(p.list.children[0].children[0].href, "https://example.test/blog/builds/boris.html#receipts");
});

test("an empty query clears the active option and expanded state", async () => {
  const p = palette(async () => response());
  await p.open();
  await p.query("boris");
  assert.equal(p.input.getAttribute("aria-activedescendant"), "pr-0");
  await p.query("");
  assert.equal(p.input.getAttribute("aria-activedescendant"), null);
  assert.equal(p.input.getAttribute("aria-expanded"), "false");
  assert.equal(p.list.children.length, 0);
});

test("no matches use a separate status, not an invalid listbox child", async () => {
  const p = palette(async () => response());
  await p.open();
  await p.query("boris");
  await p.query("nothing-matches");
  assert.equal(p.input.getAttribute("aria-activedescendant"), null);
  assert.equal(p.input.getAttribute("aria-expanded"), "false");
  assert.equal(p.list.children.length, 0);
  assert.equal(p.status.hidden, false);
  assert.match(p.status.textContent, /no matches/i);
});

test("HTTP failures are announced and a later attempt retries", async () => {
  let attempts = 0;
  const p = palette(async () => ++attempts === 1 ? { ok: false } : response());
  await p.open();
  assert.match(p.status.textContent, /unavailable/i);
  assert.equal(p.input.getAttribute("aria-expanded"), "false");
  await p.query("boris");
  assert.equal(attempts, 2);
  assert.equal(p.list.children.length, 1);
  assert.equal(p.status.hidden, true);
});

test("malformed search indexes do not masquerade as an empty graph", async () => {
  const p = palette(async () => ({ ok: true, json: async () => ({ documents: {} }) }));
  await p.open();
  assert.match(p.status.textContent, /unavailable/i);
  assert.equal(p.list.children.length, 0);
});

test("concurrent queries share one fetch and render the latest value", async () => {
  let attempts = 0;
  let resolve;
  const pending = new Promise(done => { resolve = done; });
  const p = palette(() => { attempts++; return pending; });
  const opening = p.open();
  const querying = p.query("boris");
  resolve(response());
  await Promise.all([opening, querying]);
  assert.equal(attempts, 1);
  assert.equal(p.list.children.length, 1);
});

test("closing search clears its active option", async () => {
  const p = palette(async () => response());
  await p.open();
  await p.query("boris");
  await p.close.emit("click");
  assert.equal(p.dialog.open, false);
  assert.equal(p.input.getAttribute("aria-activedescendant"), null);
  assert.equal(p.input.getAttribute("aria-expanded"), "false");
});

test("arrow keys move selection and Escape dismisses the palette", async () => {
  const p = palette(async () => response([
    documents[0], { ...documents[0], title: "Boris notes", path: "log/boris.html" },
  ]));
  await p.open();
  await p.query("boris");
  await p.input.emit("keydown", { key: "ArrowDown" });
  assert.equal(p.input.getAttribute("aria-activedescendant"), "pr-1");
  await p.input.emit("keydown", { key: "ArrowUp" });
  assert.equal(p.input.getAttribute("aria-activedescendant"), "pr-0");
  await p.input.emit("keydown", { key: "Escape" });
  assert.equal(p.dialog.open, false);
});

test("a pending fetch does not reopen results after dismissal", async () => {
  let resolve;
  const p = palette(() => new Promise(done => { resolve = done; }));
  const opening = p.open();
  p.input.value = "boris";
  p.dialog.close();
  resolve(response());
  await opening;
  assert.equal(p.dialog.open, false);
  assert.equal(p.list.children.length, 0);
  assert.equal(p.input.getAttribute("aria-expanded"), "false");
});

test("both layouts expose a named close control and live search status", () => {
  for (const name of ["main", "trunk"]) {
    const html = fs.readFileSync(path.join(root, `manila/layouts/${name}.html`), "utf8");
    assert.match(html, /data-palette-close[^>]*aria-label="Close search"/);
    assert.match(html, /class="palette__status"[^>]*role="status"/);
  }
});

test("mobile navigation wraps and search can shrink beside color controls", () => {
  const mobile = css.split("@media (max-width: 47.99rem) {")[1].split("/* ---------- desk")[0];
  assert.match(mobile, /\.site-nav__trunk > ul \{ flex-wrap: wrap;/);
  assert.match(mobile, /\.find \{[^}]*min-width: 0;/);
});

test("mobile keeps search on the first bar row and wraps navigation instead", () => {
  const mobile = css.split("@media (max-width: 47.99rem) {")[1].split("/* ---------- desk")[0];
  assert.match(mobile, /\.bar__tools \{[^}]*order: 1;/);
  assert.match(mobile, /\.bar__nav \{[^}]*order: 2;[^}]*flex-basis: 100%;/);
  assert.doesNotMatch(mobile, /\.bar__tools \{[^}]*width: 100%;/);
});

function luminance(hex) {
  const rgb = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255);
  return rgb.map(c => c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4)
    .reduce((sum, c, i) => sum + c * [.2126, .7152, .0722][i], 0);
}
function contrast(a, b) {
  const [low, high] = [luminance(a), luminance(b)].sort((x, y) => x - y);
  return (high + .05) / (low + .05);
}

for (const mode of ["dark", "light", "pride"]) {
  test(`${mode} small labels meet AA on every theme surface`, () => {
    const body = css.split(`html[data-mode="${mode}"] {`)[1].split("}")[0];
    const tokens = Object.fromEntries([...body.matchAll(/--([\w-]+):\s*(#[0-9a-f]{6})/g)]
      .map(match => [match[1], match[2]]));
    for (const surface of ["canvas", "card", "raised", "well"]) {
      for (const ink of ["faint", "signal"]) {
        assert.ok(contrast(tokens[ink], tokens[surface]) >= 4.5,
          `${mode} ${ink} on ${surface}: ${contrast(tokens[ink], tokens[surface]).toFixed(2)}`);
      }
    }
  });
}
