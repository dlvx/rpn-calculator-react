import React, { useState } from "react";
import Terminal, { ColorMode, TerminalOutput } from "react-terminal-ui";
import "./App.css";
import { calculate } from "./utils/operations";

function App() {
  const [operands, setOperands] = useState<number[]>([]);

  const inputHandler = (input: string) => {
    const pass = input.match(/^[0-9qc+\-*/\s]*$/);

    if (pass) {
      if (input === "c" || input === "q") {
        setOperands([]);
      } else {
        const res = calculate(input, operands);
        setOperands(res);
      }
    } else {
      alert(
        "Only numeric values and the operators: + - * / are allowed. Enter 'c' to clear the stored values and 'q' to exit."
      );
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ textAlign: "left" }}>
          <p>Instructions:</p>
          <p>
            - Use reverse polish notation to input your operands and operators,
            you can input an entire set like this, using a space as delimiter: 5
            5 5 8 + + -
          </p>
          <p>
            - You can also input operand by operand, hitting enter in between.
            The operands will be added to a stack for later use by an operator.
            Calculations will execute once you enter an operator.
          </p>
          <p>
            - In both scenarios, an operator needs two preceeding operands,
            otherwise it will be disregarded.
          </p>
          <p>- The allowed operators are: + - / *</p>
          <p>- An empty input will be interpreted as a 0.</p>
          <p>- Type 'c' if you want to clear your stack.</p>
          <p>
            - <strong>In this version only:</strong> Typing 'q' will clear the
            stack instead of quitting.
          </p>
          <p>Have fun!</p>
        </div>
        <Terminal
          name="RPN Calculator React"
          colorMode={ColorMode.Light}
          onInput={inputHandler}
        >
          <TerminalOutput>Result:</TerminalOutput>
          {operands[operands.length - 1]}
        </Terminal>
      </header>
    </div>
  );
}

export default App;
