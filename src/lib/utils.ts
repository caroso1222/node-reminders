import execa from 'execa';
import * as path from 'path';

const JXA_SCRIPTS_DIRNAME = 'jxa';

function jxaPath(name: string): string {
  return path.join(__dirname, '..', JXA_SCRIPTS_DIRNAME, `${name}.jxa`);
}

export const JXA_SCRIPTS = {
  createList: jxaPath('create-list'),
  createReminder: jxaPath('create-reminder'),
  deleteReminder: jxaPath('delete-reminder'),
  getList: jxaPath('get-list'),
  getLists: jxaPath('get-lists'),
  getReminder: jxaPath('get-reminder'),
  getReminders: jxaPath('get-reminders'),
  updateReminder: jxaPath('update-reminder'),
};

export async function execJXA<T, R = {}>(scriptPath: string, data?: R): Promise<T> {
  const prefix = process.env.NODE_ENV === 'test' ? 'test' : '';

  const { stderr } = await execa(prefix + 'osascript', [
    '-l', //
    'JavaScript',
    scriptPath,
    JSON.stringify(data),
  ]);

  return JSON.parse(stderr);
}

/**
 * Takes an object and return an equivalent object with string dates converted to Date objects
 */
export function withParsedDates<T extends { readonly [key: string]: any }>(data: T): T {
  const dateProps: ReadonlyArray<any> = [
    'completionDate',
    'creationDate',
    'dueDate',
    'modificationDate',
    'remindMeDate',
  ];
  const final = Object.keys(data).reduce((obj, prop) => {
    const isDate = dateProps.indexOf(prop) !== -1;
    const val = data[prop];
    const newObj = { ...obj, [prop]: isDate ? new Date(val) : val };
    return newObj;
  }, {});
  return final as T;
}
