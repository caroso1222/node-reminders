const reminders = require('../../build/main/index');

(async () => {
  try {
    const { id } = (await reminders.getLists())[0];
    const firstList = await reminders.getList(id);
    console.log(firstList);
  } catch (e) {
    console.error(e.stderr);
  }
})();
