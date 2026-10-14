const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.join(__dirname, "..");
const read = name => fs.readFileSync(path.join(root, name), "utf8");
const setup = read(".github/actions/setup-boris/action.yml");

test("cached Boris builds use a baseline CPU and cannot restore the old native cache", () => {
  assert.match(setup, /^\s+zig build -Dcpu=baseline$/m);
  const key = setup.match(/^\s+key: (.+)$/m)?.[1];
  assert.ok(key, "Boris cache key");
  assert.match(key, /^boris-v2-/);
  for (const part of ["inputs.boris-commit", "inputs.zig-version", "runner.os", "runner.arch", "baseline"]) {
    assert.ok(key.includes(part), part);
  }
  assert.doesNotMatch(setup, /^\s+restore-keys:/m);
});

test("fresh and restored Boris smoke checks have a hard timeout", () => {
  assert.match(setup, /^\s+timeout --kill-after=5s 30s "\$BIN" --version$/m);
  assert.match(setup, /^\s+run: timeout --kill-after=5s 30s boris --help$/m);
});

test("every CI and deployment job is bounded without renaming required checks", () => {
  for (const name of ["ci", "validate", "deploy"]) {
    const workflow = read(`.github/workflows/${name}.yml`);
    const runners = workflow.match(/^\s+runs-on: ubuntu-latest$/gm) || [];
    const bounded = workflow.match(/^\s+runs-on: ubuntu-latest\n\s+timeout-minutes: 15$/gm) || [];
    assert.ok(runners.length, `${name} jobs`);
    assert.equal(bounded.length, runners.length, `${name} job deadlines`);
  }
  const ci = read(".github/workflows/ci.yml");
  for (const name of ["Validate content", "Build site", "Verify dist output"]) {
    assert.ok(ci.includes(`name: ${name}\n`), name);
  }
});
