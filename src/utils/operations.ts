export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}

export function divide(a: number, b: number): number {
  if (!b) {
    return 0;
  }

  return a / b;
}

const OPERATOR_FUNCTIONS: Record<string, (a: number, b: number) => number> = {
  ["+"]: add,
  ["-"]: subtract,
  ["*"]: multiply,
  ["/"]: divide,
};

export function calculate(input: string, operands: number[]): number[] {
  const inputElements = input.split(" ").filter((e) => e);

  inputElements.forEach(function (element) {
    const isNumber = !isNaN(element as any);
    const isOperator =
      !isNumber && Object.keys(OPERATOR_FUNCTIONS).includes(element);

    if (isNumber) {
      operands = [...operands, Number(element)];
    } else if (isOperator) {
      const operator = element;
      const operation = OPERATOR_FUNCTIONS[operator];
      const b = operands.pop() || 0;
      const a = operands.pop();
      const result = a && b ? operation(a, b) : b;
      operands = [...operands, result];
    }
  });

  return operands.length ? operands : [0];
}
