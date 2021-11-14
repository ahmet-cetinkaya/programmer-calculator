export enum NumberSystemRadix {
  Binary = 2,
  Octal = 8,
  Decimal = 10,
  Hexadecimal = 16,
}

export enum Shift {
  ArithmeticShift,
  LogicalShift,
  RotateCircularShift,
  RotateThroughCarryCircularShift,
}

export const numberSystems = [
  {
    name: 'Binary',
    radix: NumberSystemRadix.Binary,
  },
  {
    name: 'Octal',
    radix: NumberSystemRadix.Octal,
  },
  {
    name: 'Decimal',
    radix: NumberSystemRadix.Decimal,
  },
  {
    name: 'Hexadecimal',
    radix: NumberSystemRadix.Hexadecimal,
  },
];

export class NumberSystem {
  static validateNumberFromRadix(number: string | number, radix: NumberSystemRadix): boolean {
    if (typeof number === 'number') number = number.toString();
    if (typeof number !== 'string') return false;
    if (radix == NumberSystemRadix.Binary) return /^[01]+$/.test(number);
    if (radix == NumberSystemRadix.Octal) return /^[0-7]+$/.test(number);
    if (radix == NumberSystemRadix.Decimal) return /^[0-9]+$/.test(number);
    if (radix == NumberSystemRadix.Hexadecimal) return /^[0-9a-fA-F]+$/.test(number);
    return false;
  }

  static convert(number: string, fromRadix: NumberSystemRadix, toRadix: NumberSystemRadix): string {
    return parseInt(number, fromRadix).toString(toRadix);
  }
}
