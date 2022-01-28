const Manager = require('./lib/Manager');
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const render = require('./util/generateHtml')
const fs =  require('fs')

const members = [];

function Start() {

    function createManager() {
        inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "What is the managers name?"
            },
            {
                type: "input",
                name: "id",
                message: "What is Manager's ID?"

            },
            {
                type: "input",
                name: "email",
                message: "What is the manager's email?"
            },
            {
                type: "input",
                name: "officeNumber",
                message: "What is the manager's office number?"
            }
        ]

        ).then((answers) => {
            const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
            members.push(manager)
            buildTeam()
        })
    }

    function buildTeam() {
        inquirer.prompt([
            {
                type: "list",
                name: "choice",
                message: "Would you like to do",
                choices: ["add engineer", "add intern", "done"]
            }
        ]).then((answer) => {
            switch (answer.choice) {
                case "add engineer":
                    createEngineer()
                    break;
                case "add intern":
                    createIntern()
                    break;
                default:
                createHtml()

            }
        })
    }

    function createEngineer() {
        inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "What is the Engineer's name?"
            },
            {
                type: "input",
                name: "id",
                message: "What is Engineer's ID?"

            },
            {
                type: "input",
                name: "email",
                message: "What is the Engineer's email?"
            },
            {
                type: "input",
                name: "github",
                message: "What is the Engineer's Github?"
            }
        ]

        ).then((answers) => {
            const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github)
            members.push(engineer)
            buildTeam()
        })
    }

    function createIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "What is the Interns name?"
            },
            {
                type: "input",
                name: "id",
                message: "What is Interns ID?"

            },
            {
                type: "input",
                name: "email",
                message: "What is the Interns email?"
            },
            {
                type: "input",
                name: "school",
                message: "What is the Interns school?"
            }
        ]

        ).then((answers) => {
            const intern = new Intern(answers.name, answers.id, answers.email, answers.school)
            members.push(intern)
            buildTeam()
        })
    }

    function createHtml(){
        fs.writeFileSync("index.html", render(members))
    }

    createManager()
}

Start()