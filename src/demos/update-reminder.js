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
    const fiveYears = new Date();
    fiveYears.setFullYear(fiveYears.getFullYear() + 5);
    const edited = await reminders.updateReminder(lastReminder.id, {
      name: 'New Name ' + Math.ceil(Math.random() * 200),
      completed: false,
      remindMeDate: fiveYears,
    });
    console.log(edited);
  } catch (e) {
    console.error(e.stderr);
  }
})();
