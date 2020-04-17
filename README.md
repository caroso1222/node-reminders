# node-reminders

A NodeJS and TypeScript wrapper for the macOS Reminders App.

- 🔥 Easy to use interface to create, retrieve, update and delete lists and reminders
- 👾 CommonJS and ES6 modules
- 🤖 Typings available
- 🎩 JXA-based communication with the Reminders App
- 🏄‍♂️ Fully unit tested

# Installation

```
npm i node-reminders
```

# Usage

Use it in JavaScript with CommonJS or in TypeScript with ES6 modules.

```typescript
// with JavaScript
const reminders = require('node-reminders');

// with TypeScript
import * as reminders from 'node-reminders';

async function run() {
  // get lists
  const lists = await reminders.getLists();

  // create reminder
  const laterToday = new Date();
  laterToday.setHours(laterToday.getHours() + 8);

  reminders.createReminder(lists[0].id, {
    name: 'Call John',
    body: 'Catch up on the plan',
    remindMeDate: laterToday,
  });
}
```

# API

#### `getLists(): Promise<List[]>`

Resolves with the list of reminders [lists](#list).

#### `getList(id: string): Promise<List>`

Resolves with the detail of a specific [list](#list).

#### `createList(data: List): Promise<string>`

Creates a new reminders list and resolves with its ID.

#### `getReminders(listId: string, props?: Array<keyof Reminder>): Promise<Reminder[]>`

Resolves with the [reminders](#reminder) of a given list. Optionally specify which props to retrieve. The more props, the slower the query. See the reminders example for more.

#### `getReminder(reminderId: string, props?: Array<keyof Reminder>): Promise<Reminder>`

Resolves with the information of a specific reminder. Optionally specify which props to retrieve.

#### `updateReminder(id: string, data: Partial<Reminder>): Promise<string>`

Updates a reminder and resolves with its ID. Pass only the subset of parameters to modify.

#### `deleteReminder(id: string): Promise<true>`

Deletes a reminder and resolves with `true` if successful. Throws exception otherwise.

#### `createReminder(listId: string, data: Partial<Reminder>): Promise<string>`

Creates a reminder in a list and resolves with its ID. See [example](#create-reminder).

# Examples

## List management

#### Get Lists

```typescript
import { getLists, getList, createList } from 'node-reminders';

(async () => {
  const lists = await getLists();
  console.log(lists);

  /**
   * [
   *  { name: 'Reminders', id: '2480C298-017A-11EB-BBBF-CB4F4FDF3602' },
   *  { name: 'Family TODO', id: '3D8660F9-9925-461A-B5FB-B0DDD56B7925' }
   * ]
   */
})();
```

#### Get List

```typescript
import { getLists, getList, createList } from 'node-reminders';

(async () => {
  const list = await getList('2480C298-017A-11EB-BBBF-CB4F4FDF3602');
  console.log(list);

  /**
   * { name: 'Reminders', id: '2480C298-017A-11EB-BBBF-CB4F4FDF3602' }
   */
})();
```

#### Create List

```typescript
import { createList } from 'node-reminders';

(async () => {
  const newList = await createList({ name: 'June Reminders' });
  console.log(newList);

  /**
   * '8AE21B5E-466A-4FDA-B59B-10B8CC80418A'
   */
})();
```


*Note: List deletion is not supported. It's simply not allowed either via `.jxa` or `.applescript` directly.*

## Reminders management

#### Get reminders

```typescript
import { getReminders } from 'node-reminders';

(async () => {
  const reminderList = await getReminders(
    '2480C298-017A-11EB-BBBF-CB4F4FDF3602',
    [ 'name', 'id', 'remindMeDate', 'completed', 'priority' ] // fetch only a subset of properties
  );
  console.log(reminderList);

  /**
      [
        { name: 'Call John',
          id: 'x-apple-reminder://776E5676-BB79-4095-8317-C94863814B50',
          remindMeDate: '2020-04-13T15:02:34.000Z',
          completed: true,
          priority: 0 },
        { name: 'Pay the bills',
          id: 'x-apple-reminder://8D9A728B-24C3-420B-A664-352B3C06E689',
          remindMeDate: '2025-04-15T15:09:08.000Z',
          completed: false,
          priority: 0 },
        { name: 'Ping Lina',
          id: 'x-apple-reminder://6C6D0961-B80D-4967-A9D6-B73F8278A117',
          remindMeDate: null,
          completed: false,
          priority: 0 },
      ]
   */
})();
```

#### Get reminder

```typescript
import { getReminder } from 'node-reminders';

(async () => {
  const reminder = await getReminder(
    'x-apple-reminder://8D9A728B-24C3-420B-A664-352B3C06E689',
    ['name', 'remindMeDate', 'completed']
  );
  console.log(reminder);

  /**
    {
      name: 'Pay the bills',
      remindMeDate: '2025-04-15T15:09:08.000Z',
      completed: false
    }
   */
})();
```

#### Update reminder

```typescript
import { updateReminder } from 'node-reminders';

(async () => {
  const oneMonthLater = new Date();
  oneMonthLater.setFullYear(oneMonthLater.getMonth() + 1);

  const edited = await reminders.updateReminder(
    'x-apple-reminder://8D9A728B-24C3-420B-A664-352B3C06E689',
    {
      name: 'Pay cable',
      completed: true,
      remindMeDate: oneMonthLater,
    }
  );
  console.log(edited);

  /**
   * 'x-apple-reminder://8D9A728B-24C3-420B-A664-352B3C06E689'
   */
})();
```

#### Delete reminder

```typescript
import { deleteReminder } from 'node-reminders';

(async () => {
  try {
    const deletedReminder = await reminders.deleteReminder('2480C298-017A-11EB-BBBF-CB4F4FDF3602');
    console.log(deleteReminder);
  } catch(e) {
    console.error('Something failed. Could not delete the reminder.');
  }

  /**
   * true
   */
})();
```

#### Create reminder

```typescript
import { createReminder } from 'node-reminders';

(async () => {
  const laterToday = new Date();
  laterToday.setHours(laterToday.getHours() + 8);

  const newReminder = await createReminder(
    '2480C298-017A-11EB-BBBF-CB4F4FDF3602',
    {
      name: 'Update daily journal',
      body: 'Lots of things going on',
      remindMeDate: laterToday,
      completed: false,
  });
  console.log(newReminder);

  /**
   * 'x-apple-reminder://32E91818-16FB-4E89-9C36-4960207AEA12
   */
})();
```

# Interfaces

The interface prop names are self-explanatory. Descriptions are intentionally omitted.

### `List`

Param | Type 
------|------
name|string
id|string

### `Reminder`

Param | Type 
------|------
name|string
body|string
id|string
complete|boolean
completionDate|Date
creationDate|Date
dueDate|Date
modificationDate|Date
remindMeDate|Date
priority|number

# How it works

Under the hood, this library is an interface to run [JXA](https://developer.apple.com/library/archive/documentation/LanguagesUtilities/Conceptual/MacAutomationScriptingGuide/index.html) scripts in the terminal. JXA is JavaScript for OSX automation. You can find all the scripts in [`src/jxa`](src/jxa). Arguments and outputs are passed back and forth via *stringified* objects.

# Licence

MIT © [Carlos Roso](https://carlosroso.com/)
