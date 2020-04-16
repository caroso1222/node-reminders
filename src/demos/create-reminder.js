const reminders = require('../../build/main/index');

(async () => {
  try {
    const { id } = (await reminders.getLists())[0];
    const firstList = await reminders.getList(id);
    const fiveYears = new Date();
    fiveYears.setFullYear(fiveYears.getFullYear() + 5);
    const newReminder = await reminders.createReminder(firstList.id, {
      name: 'API Reminder ' + Math.ceil(Math.random() * 200),
      body: 'This is the body',
      remindMeDate: fiveYears,
      completed: false,
    });
    console.log(newReminder);
  } catch (e) {
    console.error(e.stderr);
  }
})();
