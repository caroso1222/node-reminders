// tslint:disable:no-expression-statement
// tslint:disable-next-line: no-object-mutation
process.env.NODE_ENV = 'test';
import test, { ExecutionContext } from 'ava';
import * as path from 'path';
import { Reminder } from './models';
import * as Reminders from './reminders';

/**
 * ----------------------------------------------------------------------------------------------
 * In this file we test the public API by asserting the commands executed in the terminal.
 * It's based on the assumption that the JXA scripts work as expected (tested elsewhere) and the
 * only responsibility of the API is calling the scripts as they should.
 *
 * As we can't rely on the reminders app to be available in the system, we call a fake
 * command "testosascript" so that it fails and we catch the error. With the error object available,
 * we can now check its 'command' property and assert the command was called as expected.
 * ----------------------------------------------------------------------------------------------
 */

/**
 * Gets the JXA path to a filename
 * @param name - the file name
 * @returns the absolute path to the jxa file
 */
function getScriptPath(name: string): string {
  return path.join(__dirname, `../jxa/${name}`);
}

/**
 * Builds the shell command to run a JXA file with arguments
 *
 * @param scriptName - the name of the JXA file, with extension
 * @param args - the arguments to call the JXA file
 * @returns the shell command that should be run in the terminal
 */
function buildJXACommand(scriptName: string, args?: object): string {
  return `osascript -l JavaScript ${getScriptPath(scriptName)} ${
    args ? JSON.stringify(args) : ''
  }`.trim();
}

/**
 * Executes an API method and returns the command that was run on the terminal
 *
 * @param t - ava execution context
 * @param fn - function
 * @returns the command that was run on the terminal
 */
async function executeAPIMethod<T, R extends PromiseLike<T>>(
  fn: R,
  t: ExecutionContext
): Promise<string> {
  const { command } = (await t.throwsAsync(fn)) as any;
  return command.replace('test', '').trim();
}

test('get lists', async t => {
  const command = await executeAPIMethod(Reminders.getLists(), t);
  t.is(command, buildJXACommand('get-lists.jxa'));
});

test('get list', async t => {
  const id = '123asdf';
  const command = await executeAPIMethod(Reminders.getList(id), t);
  t.is(command, buildJXACommand('get-list.jxa', { id }));
});

test('create list', async t => {
  const name = 'listfoobar';
  const command = await executeAPIMethod(Reminders.createList({ name }), t);
  t.is(command, buildJXACommand('create-list.jxa', { data: { name } }));
});

test('get reminders', async t => {
  const id = 'listfoobar';
  const command = await executeAPIMethod(Reminders.getReminders(id), t);
  t.is(command, buildJXACommand('get-reminders.jxa', { id }));
});

test('get reminders with props', async t => {
  const id = 'listfoobar';
  const props: ReadonlyArray<keyof Reminder> = ['name', 'completed', 'remindMeDate'];
  const command = await executeAPIMethod(Reminders.getReminders(id, props), t);
  t.is(command, buildJXACommand('get-reminders.jxa', { id, props }));
});

test('get reminder', async t => {
  const id = 'listfoobar';
  const command = await executeAPIMethod(Reminders.getReminder(id), t);
  t.is(command, buildJXACommand('get-reminder.jxa', { id }));
});

test('get reminder with props', async t => {
  const id = 'listfoobar';
  const props: ReadonlyArray<keyof Reminder> = ['name', 'completed', 'remindMeDate'];
  const command = await executeAPIMethod(Reminders.getReminder(id, props), t);
  t.is(command, buildJXACommand('get-reminder.jxa', { id, props }));
});

test('update reminder', async t => {
  const id = 'reminderid123';
  const data = { name: 'newname', body: 'newbody' };
  const command = await executeAPIMethod(Reminders.updateReminder(id, data), t);
  t.is(command, buildJXACommand('update-reminder.jxa', { id, data }));
});

test('delete reminder', async t => {
  const id = 'reminderid123';
  const command = await executeAPIMethod(Reminders.deleteReminder(id), t);
  t.is(command, buildJXACommand('delete-reminder.jxa', { id }));
});

test('create reminder', async t => {
  const listId = 'listfoobar';
  const data = { name: 'newname', body: 'newbody' };
  const command = await executeAPIMethod(Reminders.createReminder(listId, data), t);
  t.is(command, buildJXACommand('create-reminder.jxa', { listId, data }));
});
