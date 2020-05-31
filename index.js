const prompt = require("inquirer").createPromptModule()
const fs = require("fs")

const api = require("./utils/api.js")
const generateMarkdown = require("./utils/generateMarkdown.js")

const writeToFile = (fileName, data) => {
  fs.writeFile("README.md", data, error => error ? console.error(error) : console.log(`${"README.md"} generated!`))
}

const init = async _ => {
  let rmObject = {}
  do {
    const { rmUser, rmRepo } = await prompt([
      {
        type: "input",
        name: "rmUser",
        message: "What is your GitHub user name?"
      },
      {
        type: 'input',
        name: 'rmRepo',
        message: "What is the repository name associated with this README file?"
      }
    ])
    rmObject = await api.getUser(rmUser, rmRepo)
    if (!rmObject) {
      console.error("Repo not found!")
    } else {
      console.log(`${rmObject.fullName} we found it!`)
    }
  } while (!rmObject)
  // const ghApi = await api.getUser(rmUser)
  Object.assign(rmObject, await prompt([
    {
      type: "input",
      name: "title",
      message: "What is the project title?"
    },
    {
      type: "input",
      name: "rmDesc",
      message: "What is the project description?"
    },
    {
      type: "input",
      name: "inst",
      message: "What are the steps required to install the App?"
    },
    {
      type: "input",
      name: "use",
      message: "Does your App have instructions for use?"
    },
    {
      type: "checkbox",
      name: "lic",
      message: "Does your App have a license?",
      choices: [
          "Yes",
          "No"
      ]
    },
    {
      type: "input",
      name: "con",
      message: "Do you have contributors?"
    },
    {
      type: "input",
      name: "test",
      message: "Do you have test for your application?"
    },
    {
      type: "input",
      name: "qs",
      message: "Any questions?"
    }
  ]))
  writeToFile(rmObject.title, await generateMarkdown(rmObject))
}

init()
