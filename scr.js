const reminders = require('./build/main/index')

async function run() {
  try {
    // const lists = await reminders.getLists();
    // console.log(lists.map(list => list.id));
    // const firstList = lists[0];
    // const list = await reminders.getList(firstList.id);
    // console.log(list);
    // const reminderList = await reminders.getReminders(list.id, ['name', 'id', 'remindMeDate', 'completed', 'priority']);
    // console.log(reminderList);
    // const lastReminder = reminderList[reminderList.length - 1]
    // const reminder = await reminders.getReminder(lastReminder.id, ['name', 'remindMeDate', 'completed']);
    // console.log(reminder);

    // Reminders ID : B0897970-05EF-4A1B-B167-DC199F05BFDC
    // const mockListID = firstList.id;
    // const fiveMinutes = new Date();
    // fiveMinutes.setMinutes(fiveMinutes.getMinutes() + 5);
    // const newReminder = await reminders.createReminder(mockListID, {
    //   name: 'Do something',
    //   body: 'This is the body',
    //   remindMeDate: fiveMinutes,
    //   completed: false,
    // });
    // console.log(newReminder);

    // const edited = await reminders.updateReminder(lastReminder.id, {
    //   name: 'New Name Worked',
    //   completed: false,
    //   remindMeDate: new Date()
    // });
    // console.log(edited);

    // const deletedReminder = await reminders.deleteReminder(lastReminder.id);
    // console.log(deletedReminder);

    const newList = await reminders.createList({name: 'Created List' + Math.ceil(Math.random()*200)});
    console.log(newList);
  } catch(e) {
    console.error(e.stderr);
  }
}

run();

