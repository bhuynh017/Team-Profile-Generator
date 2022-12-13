const Manager = require("../lib/Manager");

test("creates an Manager object", () => {
  const manager = new Manager("bryant", 77, "bryant@gmail", 7);

  expect(manager.officeNumber).toEqual(expect.any(Number));
});

test("gets role of employee", () => {
  const manager = new Manager("bryant", 77, "bryant@gmail.com");

  expect(manager.getRole()).toEqual("Manager");
});
