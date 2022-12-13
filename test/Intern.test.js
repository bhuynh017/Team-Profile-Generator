const Intern = require("../lib/Intern");

test("creates an Intern object", () => {
  const intern = new Intern("bryant", 77, "bryant@gmail", "UNT");

  expect(intern.school).toEqual(expect.any(String));
});

test("gets employee school", () => {
  const intern = new Intern("bryant", 77, "bryant@gmail", "UNT");

  expect(intern.getSchool()).toEqual(
    expect.stringContaining(intern.school.toString())
  );
});

test("gets role of employee", () => {
  const intern = new Intern("bryant", 77, "bryant@gmail.com", "UNT");

  expect(intern.getRole()).toEqual("Intern");
});
