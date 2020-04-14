import { List, Reminder } from './models';
import { execJXA, JXA_SCRIPTS } from './utils';

export function getLists(): Promise<readonly List[]> {
  return execJXA(JXA_SCRIPTS.getLists);
}

export function getList(id: string): Promise<readonly List[]> {
  return execJXA(JXA_SCRIPTS.getList, { id });
}

export async function createList(data: Omit<List, 'id'>): Promise<string> {
  // tslint:disable-next-line: no-expression-statement
  await execJXA(JXA_SCRIPTS.createList, { data });
  const lists = await getLists();
  return lists[lists.length - 1].id;
}

export function getReminders(listId: string, props?: ReadonlyArray<keyof Reminder>): Promise<readonly Reminder[]> {
  return execJXA(JXA_SCRIPTS.getReminders, { id: listId, props });
}

export function getReminder(reminderId: string, props?: ReadonlyArray<keyof Reminder>): Promise<Reminder> {
  return execJXA(JXA_SCRIPTS.getReminder, { id: reminderId, props });
}

export function updateReminder(id: string, data: Partial<Reminder>): Promise<string> {
  return execJXA(JXA_SCRIPTS.updateReminder, { id, data });
}

export function deleteReminder(id: string): Promise<boolean> {
  return execJXA(JXA_SCRIPTS.deleteReminder, { id });
}

export function createReminder(listId: string, data: Partial<Omit<Reminder, 'id'>>): Promise<string> {
  return execJXA(JXA_SCRIPTS.createReminder, { listId, data });
}
