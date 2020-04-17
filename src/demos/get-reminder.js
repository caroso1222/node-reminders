const reminders = require('../../build/main/index');

(async () => {
  try {
    const { id } = (await reminders.getLists())[0];
    const firstList = await reminders.getList(id);
    const reminderList = await reminders.getReminders(
      firstList.id, //
      ['name', 'id', 'remindMeDate', 'completed', 'priority']
    );
    const lastReminder = reminderList[reminderList.length - 1];
    const reminder = await reminders.getReminder(
      lastReminder.id, //
      ['name', 'remindMeDate', 'completed', 'priority']
    );
    console.log(reminder);
  } catch (e) {
    console.error(e.stderr);
  }
})();
