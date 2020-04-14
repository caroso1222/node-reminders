// tslint:disable:no-expression-statement
import test from 'ava';
import * as path from 'path';
import { JXA_SCRIPTS } from './utils';

test('jxa scripts', t => {
  const expectedPath = (name: string) => path.join(__dirname, `../jxa/${name}.jxa`);
  const commands: ReadonlyArray<string> = [
    'create-list',
    'create-reminder',
    'delete-reminder',
    'get-list',
    'get-lists',
    'get-reminder',
    'get-reminders',
    'update-reminder',
  ];

  const camelToKebab = (str: string) =>
    str.replace(/([-_]\w)/g, g => g[1].toUpperCase()) as keyof typeof JXA_SCRIPTS;

  commands.forEach(command => {
    t.is(JXA_SCRIPTS[camelToKebab(command)] as any, expectedPath(command));
  });
});
