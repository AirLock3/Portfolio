import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PROJECTS,
  filterProjects,
  decodeTextStep,
  executeTerminalCommand,
  validateContactForm,
  calculateTiltAngles
} from './portfolioLogic';

test('filterProjects returns all projects when filter is all or empty', () => {
  assert.equal(filterProjects(PROJECTS, 'all').length, 4);
  assert.equal(filterProjects(PROJECTS, '').length, 4);
});

test('filterProjects filters accurately by category', () => {
  const threeD = filterProjects(PROJECTS, '3d');
  assert.equal(threeD.length, 2);
  assert.ok(threeD.every((p) => p.category === '3d'));

  const webgl = filterProjects(PROJECTS, 'webgl');
  assert.equal(webgl.length, 1);
  assert.equal(webgl[0].id, 'chronos-gyro');

  const motion = filterProjects(PROJECTS, 'motion');
  assert.equal(motion.length, 1);
  assert.equal(motion[0].id, 'kinetix-monolith');
});

test('decodeTextStep reveals full target string at progress = 1 and preserves spaces', () => {
  const target = 'CREATIVE 3D DEVELOPER';
  assert.equal(decodeTextStep(target, 1), target);
  const partial = decodeTextStep(target, 0.5);
  assert.equal(partial.length, target.length);
  assert.equal(partial[8], ' ');
  assert.equal(partial.slice(0, 8), 'CREATIVE');
});

test('executeTerminalCommand handles help, skills, about, contact, clear, and unknown', () => {
  const helpRes = executeTerminalCommand('help');
  assert.equal(helpRes.action, 'output');
  assert.ok(helpRes.lines.some((l) => l.includes('skills')));

  const clearRes = executeTerminalCommand('clear');
  assert.equal(clearRes.action, 'clear');
  assert.equal(clearRes.lines.length, 0);

  const unknownRes = executeTerminalCommand('foobar');
  assert.equal(unknownRes.action, 'output');
  assert.ok(unknownRes.lines[0].includes('foobar'));
});

test('validateContactForm rejects invalid inputs and accepts valid data', () => {
  const invalid = validateContactForm({
    name: 'A',
    email: 'invalid-email',
    projectType: '3d',
    message: 'Short'
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.message);

  const valid = validateContactForm({
    name: 'Кирилл',
    email: 'kirill@studio.dev',
    projectType: '3d',
    message: 'Нужна разработка интерактивной 3D-сцены для продуктового сайта.'
  });
  assert.equal(valid.valid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});

test('calculateTiltAngles computes symmetric tilt and glare percentages', () => {
  const rect = { left: 100, top: 100, width: 200, height: 200 };
  const center = calculateTiltAngles(200, 200, rect, 12);
  assert.equal(center.rotateX, 0);
  assert.equal(center.rotateY, 0);
  assert.equal(center.glareX, 50);
  assert.equal(center.glareY, 50);

  const topLeft = calculateTiltAngles(100, 100, rect, 12);
  assert.equal(topLeft.rotateX, 12);
  assert.equal(topLeft.rotateY, -12);
  assert.equal(topLeft.glareX, 0);
  assert.equal(topLeft.glareY, 0);
});
