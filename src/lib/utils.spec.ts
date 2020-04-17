// tslint:disable:no-expression-statement
import test from 'ava';
import * as path from 'path';
import { JXA_SCRIPTS, withParsedDates } from './utils';

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

test('with parsed dates', t => {
  const testObject = {
    completed: true,
    creationDate: '2022-04-17T12:54:15.000Z',
    name: 'foobar',
    remindMeDate: '2020-04-17T12:54:15.000Z',
    unknownDate: '2021-04-07T12:54:15.000Z',
  };
  const newObject = withParsedDates<any>(testObject);
  t.is(newObject.remindMeDate.getFullYear(), 2020);
  t.is(newObject.creationDate.getMonth(), 3);
  t.is(newObject.name, 'foobar');
  t.is(newObject.unknownDate, testObject.unknownDate);
});
