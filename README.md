# CLI RPN Calculator (React version)

This is a quick and simple React version of the CLI RPN Calculator implemented in [this repository](https://github.com/dlvx/rpn-calculator-cli).

While it does duplicate the **operations.ts** file from the other project, there's the opportunity of extracting it to a separate repository and publishing an NPM package to be able to reuse it without duplicating it.

For this version in particular, I went for a quick implementation and chose a package called **react-terminal-ui** that simulates a CLI. I would say tho, the Node CLI version performs better than this one.

#### Live Demo

You can find a live demo deployed to Netlify [here](https://stunning-cupcake-063045.netlify.app/)

The following is the readme as found in the other repository.

### Description

The following is an implementation of a CLI RPN calculator as per the requirements stated [here](https://gist.github.com/dennisbaskin/5979ff6a0d8c1e90b59d060155862767).

RPN stands for **reverse polish notation**, a mathematical notation approach where operators come after the operands.

The explanation in [this video](https://www.youtube.com/watch?v=7ha78yWRDlE) was used to implement the RPN calculation algorithm.

It was implemented using NodeJS with Typescript. Inquirer was used to handle the user prompt and Chalk was used to add some colors to the terminal output.

The unit tests were implemented with Jest.

### Why this tech stack?

The exercise description says "Implement a command-line reverse polish notation (RPN) calculator using a language that you know well."

I chose Javascript, more specifically Node and Typescript to implement this solution cause the Javascript stack has been my go-to for many years. In addition to that, implementing CLI apps with NodeJS is pretty straightforward, so I knew I could implement it in a short period of time.

The other packages involved are very popular, widely used, and pretty much plug and play packages such as [Inquirer](https://www.npmjs.com/package/inquirer), [Chalk](https://www.npmjs.com/package/chalk) and [Jest](https://www.npmjs.com/package/jest).

### Project structure

The current project structure is pretty simple, an **index.ts** and an **operations.ts** file inside a utils folder. There are also unit tests inside the utils folder that assert that the functions in **operations.ts** work as expected.

### Algorithm explanation

The code in **index.ts** executes an Inquirer prompt to handle the user input. Given this input, it calls the calculation function in **operations.ts**.

This function analyzes the input, if the input is a single number, it will push it to a stack of operands for later use. If the input includes one of the four main arithmetic operators, it will execute its respective operation over the operands in the stack.

Inquirer validates that the input only contains numeric digits, the four arithmetic operators, **c** for clearing the input and **q** for exiting the CLI app.
Inquirer will throw an error for any other character.

An operator needs that the operands stack contains at least 2 elements, otherwise it will be disregarded.

### Trade-offs

While working on the unit tests, I found the following scenario:

Let's say the user inputs:

_+ 1 - 2_

You could expect the resulting stack to be [1, 2] cause none of the operators have two preceeding operands to work with.

Instead, the resulting stack is [-1, 2].

This happens because when the code finds the **-**, due to the operands stack having only the number **1**, it performs the operation **0 - 1**.

I have identified the lines of code that cause this and will work on a solution.

While not exactly a critical error, it is a design choice that could confuse the users due to the unexpected result.

### Extending the app

Let's say you want to extend this app, maybe create a React framework or a server that executes the calculation given an HTTP request.

The **operations.ts** can be extracted to a separate repository or NPM package and installed in different projects. All you have to do is pass an input with operands and/or operators and an array of operands to the calculation function. The initial array of operands would be empty, but the function will take care of populating it as it analyzes the input. The function will return the new operands array after a calculation has been made.

I'll try to develop a React version to further exemplify this.

### How to run the CLI app

Make sure you have Node installed. I developed this application using Node v16.17.0.

Clone this repository using Git, once cloned, open a terminal at the project folder and run **npm install** to install all the project dependencies.

Run **npm start** to run the CLI app. A welcome message with instructions on how to use the app should be displayed.

### Running tests

After installing the project dependecies, you can run the tests by running **npm test** on the terminal.
