import { List, Reminder } from './models';
import { execJXA, JXA_SCRIPTS, withParsedDates } from './utils';

export function getLists(): Promise<readonly List[]> {
  return execJXA(JXA_SCRIPTS.getLists);
}

export function getList(id: string): Promise<List> {
  return execJXA(JXA_SCRIPTS.getList, { id });
}

export async function createList(data: Omit<List, 'id'>): Promise<string> {
  // tslint:disable-next-line: no-expression-statement
  await execJXA(JXA_SCRIPTS.createList, { data });
  const lists = await getLists();
  return lists[lists.length - 1].id;
}

export async function getReminders(
  listId: string,
  props?: ReadonlyArray<keyof Reminder>
): Promise<readonly Reminder[]> {
  const reminders = await execJXA<readonly Reminder[]>(JXA_SCRIPTS.getReminders, {
    id: listId,
    props,
  });
  return reminders.map(withParsedDates);
}

export async function getReminder(
  reminderId: string,
  props?: ReadonlyArray<keyof Reminder>
): Promise<Reminder> {
  const reminder = await execJXA<Reminder>(JXA_SCRIPTS.getReminder, { id: reminderId, props });
  return withParsedDates(reminder);
}

export function updateReminder(id: string, data: Partial<Reminder>): Promise<string> {
  return execJXA(JXA_SCRIPTS.updateReminder, { id, data });
}

export function deleteReminder(id: string): Promise<true> {
  return execJXA(JXA_SCRIPTS.deleteReminder, { id });
}

export function createReminder(
  listId: string,
  data: Partial<Omit<Reminder, 'id'>>
): Promise<string> {
  return execJXA(JXA_SCRIPTS.createReminder, { listId, data });
}
