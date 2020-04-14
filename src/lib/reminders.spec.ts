// tslint:disable:no-expression-statement
// tslint:disable-next-line: no-object-mutation
process.env.NODE_ENV = 'test';
import test from 'ava';
import * as path from 'path';
import * as Reminders from './reminders';

/**
 * In this file we test the public API by asserting the commands executed down the pipeline.
 * It's based on the assumption that the JXA scripts work as expected (tested elsewhere) and the
 * only responsibility of the API is calling the scripts as they should.
 *
 * As we can't rely on the reminders app to be available in the system, we call a fake
 * command "testosascript" so that it fails and we catch the error. With the error object available,
 * we can now check its 'command' property and assert the command was called as expected.
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
function buildJXACommand(scriptName: string, args?: string): string {
  return `osascript -l JavaScript ${getScriptPath(scriptName)}${args || ''}`;
}

test('get lists', async t => {
  const error = (await t.throwsAsync(Reminders.getLists())) as any;
  t.is(error.command.replace('test', '').trim(), buildJXACommand('get-lists.jxa'));
});
