import {NumberSystem, NumberSystemRadix} from './NumberSystem';

export enum Operator {
  Plus = '+',
  Minus = '-',
  Multiplication = '*',
  Division = '/',
  Mod = '%',
  LeftShift = '<<',
  RightShift = '>>',
  UnsignedRightShift = '>>>',
  And = '&',
  Or = '|',
  Not = '~',
  Xor = '^',
}

export enum OperatorSymbol {
  Plus = '﹢',
  Minus = '﹣',
  Multiplication = '×',
  Division = '÷',
  Mod = '⁒',
  LeftShift = '≪',
  RightShift = '≫',
  UnsignedRightShift = '⋙',
  And = 'AND',
  Or = 'OR',
  Not = 'NOT',
  Xor = 'XOR',
  NAnd = 'NAND',
  NOr = 'NOR',
}

export class Calculator {
  static Operators = Object.values(Operator);
  static operatorSymbolsRegex = new RegExp(
    Object.values(OperatorSymbol)
      .map(operatorSymbol => `\\${operatorSymbol}`)
      .join('|'),
    'g',
  );

  static calculate(input: string, radix: NumberSystemRadix): string {
    if (this.checkIsNotDecoded(input)) input = Calculator.decode(input, radix);
    let result: number = eval(input);
    return result.toString(radix);
  }

  static encode(input: string, radix: NumberSystemRadix): string {
    input = input
      .replaceAll(Operator.Plus, OperatorSymbol.Plus)
      .replaceAll(Operator.Minus, OperatorSymbol.Minus)
      .replaceAll(Operator.Multiplication, ` ${OperatorSymbol.Multiplication} `)
      .replaceAll(Operator.Division, ` ${OperatorSymbol.Division} `)
      .replaceAll(Operator.Mod, ` ${OperatorSymbol.Mod} `)
      .replaceAll(Operator.LeftShift, ` ${OperatorSymbol.LeftShift} `)
      .replaceAll(Operator.RightShift, ` ${OperatorSymbol.RightShift} `)
      .replaceAll(Operator.UnsignedRightShift, ` ${OperatorSymbol.UnsignedRightShift} `)
      .replaceAll(Operator.And, ` ${OperatorSymbol.And} `)
      .replaceAll(Operator.Or, ` ${OperatorSymbol.Or} `)
      .replaceAll(Operator.Not, ` ${OperatorSymbol.Not} `);
    return input.toUpperCase();
  }

  static decode(input: string, radix: NumberSystemRadix): string {
    const inputArray = input.split(' ');

    // Convert Numbers To Decimal
    inputArray.forEach((value, index) => {
      if (!this.operatorSymbolsRegex.test(value))
        inputArray[index] = NumberSystem.convert(value, radix, NumberSystemRadix.Decimal);
    });

    // Convert Operators
    inputArray.forEach((value, index) => {
      switch (value) {
        case OperatorSymbol.Plus:
          inputArray[index] = Operator.Plus;
          break;
        case OperatorSymbol.Minus:
          inputArray[index] = Operator.Minus;
          break;
        case OperatorSymbol.Multiplication:
          inputArray[index] = Operator.Multiplication;
          break;
        case OperatorSymbol.Division:
          inputArray[index] = Operator.Division;
          break;
        case OperatorSymbol.Mod:
          inputArray[index] = Operator.Mod;
          break;
        case OperatorSymbol.LeftShift:
          inputArray[index] = Operator.LeftShift;
          break;
        case OperatorSymbol.RightShift:
          inputArray[index] = Operator.RightShift;
          break;
        case OperatorSymbol.UnsignedRightShift:
          inputArray[index] = Operator.UnsignedRightShift;
          break;
        case OperatorSymbol.And:
          inputArray[index] = Operator.And;
          break;
        case OperatorSymbol.Or:
          inputArray[index] = Operator.Or;
          break;
        case OperatorSymbol.Not:
          inputArray[index] = Operator.Not;
          break;
        case OperatorSymbol.Xor:
          inputArray[index] = Operator.Xor;
          break;
        case OperatorSymbol.NAnd:
          inputArray[index - 1] = `!(${inputArray[index - 1]}`;
          inputArray[index] = Operator.And;
          inputArray[index + 1] = `${inputArray[index + 1]})`;
          break;
        case OperatorSymbol.NOr:
          inputArray[index - 1] = `!(${inputArray[index - 1]}`;
          inputArray[index] = Operator.Or;
          inputArray[index + 1] = `${inputArray[index + 1]})`;
          break;
      }
    });

    return inputArray.join('');
  }

  static checkIsNotDecoded(input: string): boolean {
    if (typeof input !== 'string') input = String(input);
    return Object.values(OperatorSymbol).some(operatorSymbol => input.includes(operatorSymbol));
  }

  static convertRadixInInput(
    input: string,
    fromRadix: NumberSystemRadix,
    toRadix: NumberSystemRadix,
  ): string {
    const inputArray = input.split(' ');
    inputArray.forEach((value, index) => {
      if (!this.operatorSymbolsRegex.test(value))
        inputArray[index] = NumberSystem.convert(value, fromRadix, toRadix);
    });
    return inputArray.join(' ').toUpperCase();
  }
}
