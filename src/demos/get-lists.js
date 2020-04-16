const reminders = require('../../build/main/index');

(async () => {
  try {
    const lists = await reminders.getLists();
    console.log(lists);
  } catch (e) {
    console.error(e.stderr);
  }
})();
