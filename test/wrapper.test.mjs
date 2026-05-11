import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

const packageJson = JSON.parse(
  fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8'),
);
const binSource = fs.readFileSync(new URL('../bin/trueadmin.mjs', import.meta.url), 'utf8');

test('publishes the unscoped trueadmin bin wrapper', () => {
  assert.equal(packageJson.name, 'trueadmin');
  assert.equal(packageJson.type, 'module');
  assert.equal(packageJson.bin.trueadmin, 'bin/trueadmin.mjs');
  assert.deepEqual(packageJson.files, ['bin']);
});

test('forwards the executable to the framework cli package', () => {
  assert.match(binSource, /^#!\/usr\/bin\/env node/);
  assert.match(binSource, /import '@trueadmin\/cli\/src\/index\.mjs';/);
  assert.match(packageJson.dependencies['@trueadmin/cli'], /^\^0\.1\./);
});
