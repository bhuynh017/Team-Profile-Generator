const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const jest = require('jest');


const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');


const DIST_DIR = path.resolve(__dirname, 'dist')
const outputPath = path.join(DIST_DIR, 'index.html');

const render = require('./src/page-template.js');

const teamArr = [];
const idArr = [];


function startApp() {

    function addManager() {
        console.log("Lets start building your team profile!");
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "What is your manager's name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter your team manager's name!";
                }
            },
            {
                type: "input",
                name: "managerId",
                message: "What is your manager's ID?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter your Manager's ID!";
                }
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is your manager's email?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Email address field is required!";
                }
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "What is your manager's office number? (format: 111111111)",
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please your a valid phone number.";
                }
            }
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            teamArr.push(manager);
            idArr.push(answers.managerId);
            addTeam();
        });
    }

    function addTeam() {
        inquirer.prompt([
            {
                type: "list",
                name: "memberChoice",
                message: "What would you like to add next?",
                choices: [
                    "Engineer",
                    "Intern",
                    "End application"
                ]
            }
        ]).then(userChoice => {
            switch (userChoice.memberChoice) {
                case "Engineer":
                    addEngineer();
                    break;
                case "Intern":
                    addIntern();
                    break;
                default:
                    generateHTML();
            }
        });
    }

    function addEngineer() {
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "What is the engineer's name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Engineer's name is required!";
                }
            },
            {
                type: "input",
                name: "engineerId",
                message: "What is the engineer's id?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter a valid Engineer's ID!";
                }
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "What is the engineer's email?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Email address is required!";
                }
            },
            {
                type: "input",
                name: "engineerGithub",
                message: "What is the engineer's GitHub username?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter a valid GitHub username.";
                }
            }
        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
            teamArr.push(engineer);
            idArr.push(answers.engineerId);
            addTeam();
        });
    }

    function addIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "What is the intern's name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter the intern's name.";
                }
            },
            {
                type: "input",
                name: "internId",
                message: "What is the intern's id?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter a valid Intern's ID!";
                }
            },
            {
                type: "input",
                name: "internEmail",
                message: "What is the intern's email?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Email address can't be empty!";
                }
            },
            {
                type: "input",
                name: "internSchool",
                message: "What is the intern's school?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter a valid school!";
                }
            }

        ]).then(answers => {
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
            teamArr.push(intern);
            idArr.push(answers.internId);
            addTeam();
        });
    }
    
    function generateHTML() {

        if (!fs.existsSync(DIST_DIR)) {
            fs.mkdirSync(DIST_DIR)
        }
        console.log("Generating Team Profile.... ");
        fs.writeFileSync(outputPath, render(teamArr), "utf-8");
    }

    addManager();
}

startApp();