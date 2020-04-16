const reminders = require('../../build/main/index');

(async () => {
  try {
    const newList = await reminders.createList({
      name: 'Created List ' + Math.ceil(Math.random() * 200),
    });
    console.log(newList);
  } catch (e) {
    console.error(e.stderr);
  }
})();
