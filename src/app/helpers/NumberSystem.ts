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

  static convert(number: string, fromRadix: number, toRadix: number): string {
    if (fromRadix == NumberSystemRadix.Binary) {
      if (toRadix == NumberSystemRadix.Octal) return parseInt(number, 2).toString(8);
      if (toRadix == NumberSystemRadix.Decimal) return parseInt(number, 2).toString(10);
      if (toRadix == NumberSystemRadix.Hexadecimal) return parseInt(number, 2).toString(16);
    }
    if (fromRadix == NumberSystemRadix.Octal) {
      if (toRadix == NumberSystemRadix.Binary) return parseInt(number, 8).toString(2);
      if (toRadix == NumberSystemRadix.Decimal) return parseInt(number, 8).toString(10);
      if (toRadix == NumberSystemRadix.Hexadecimal) return parseInt(number, 8).toString(16);
    }
    if (fromRadix == NumberSystemRadix.Decimal) {
      if (toRadix == NumberSystemRadix.Binary) return parseInt(number, 10).toString(2);
      if (toRadix == NumberSystemRadix.Octal) return parseInt(number, 10).toString(8);
      if (toRadix == NumberSystemRadix.Hexadecimal) return parseInt(number, 10).toString(16);
    }
    if (fromRadix == NumberSystemRadix.Hexadecimal) {
      if (toRadix == NumberSystemRadix.Binary) return parseInt(number, 16).toString(2);
      if (toRadix == NumberSystemRadix.Octal) return parseInt(number, 16).toString(8);
      if (toRadix == NumberSystemRadix.Decimal) return parseInt(number, 16).toString(10);
    }
    return number;
  }
}
