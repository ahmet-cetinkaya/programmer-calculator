import {NumberSystem, NumberSystemRadix} from './NumberSystem';

import {String as ACString} from 'src/app/helpers/String';

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
    if (!this.isEncodedInput(input)) return input;
    input = Calculator.decode(input, radix);
    console.log('🚀 Problem is solving:', input);
    let result: number = parseInt(eval(input));
    return result.toString(radix);
  }

  static encode(input: string, radix: NumberSystemRadix): string {
    // Convert keyboard input to operators
    input = input
      .replaceAll(Operator.Plus, ` ${OperatorSymbol.Plus} `)
      .replaceAll(Operator.Minus, ` ${OperatorSymbol.Minus} `)
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
    // Convert Numbers To Decimal
    input = this.convertRadixInInput(input, radix, NumberSystemRadix.Decimal);

    // Convert Operators
    const inputArray = input.split(' ');
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

  static isEncodedInput(input: string): boolean {
    if (typeof input !== 'string') input = String(input);
    return this.operatorSymbolsRegex.test(input);
  }

  static convertRadixInInput(
    input: string,
    fromRadix: NumberSystemRadix,
    toRadix: NumberSystemRadix,
  ): string {
    const inputArray = input.split(' ');
    inputArray.forEach((value, index) => {
      if (value !== '' && !this.operatorSymbolsRegex.test(value)) {
        if (value.includes('(') && value.includes(')')) {
          const startIndex = value.lastIndexOf('(') + 1,
            endIndex = value.indexOf(')'),
            number = value.substring(startIndex, endIndex);
          inputArray[index] = value.replace(
            `(${number})`,
            `(${NumberSystem.convert(number, fromRadix, toRadix)})`,
          );
        } else if (value.includes('(')) {
          const startIndex = value.lastIndexOf('(') + 1,
            number = value.substring(startIndex);
          inputArray[index] = value.replace(
            `(${number}`,
            `(${NumberSystem.convert(number, fromRadix, toRadix)}`,
          );
        } else if (value.includes(')')) {
          const endIndex = value.indexOf(')'),
            number = value.substring(0, endIndex);
          inputArray[index] = value.replace(
            `${number})`,
            `${NumberSystem.convert(number, fromRadix, toRadix)})`,
          );
        } else inputArray[index] = NumberSystem.convert(value, fromRadix, toRadix);
      }
    });
    return inputArray.join(' ').toUpperCase();
  }
}
