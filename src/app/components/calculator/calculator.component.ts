import {Calculator} from 'src/app/helpers/Calculator';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NumberSystemRadix, Shift, numberSystems} from './../../helpers/NumberSystem';
import {OperatorSymbol} from './../../helpers/Calculator';
import {pairwise} from 'rxjs/operators';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnInit {
  calculatorForm!: FormGroup;

  numberSystems = numberSystems;
  operatorSymbols = OperatorSymbol;
  numberSystemRadix = NumberSystemRadix;
  shift = Shift;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createCalculatorForm();
  }

  createCalculatorForm() {
    this.calculatorForm = this.formBuilder.group({
      input: ['0', [Validators.required]],
      radix: [NumberSystemRadix.Binary, [Validators.required]],
      shift: [Shift.ArithmeticShift, [Validators.required]],
    });

    this.calculatorForm
      .get('radix')
      ?.valueChanges.pipe(pairwise())
      .subscribe(([prev, next]: [any, any]) => {
        const {input} = this.calculatorForm.value;
        const result = Calculator.convertRadixInInput(input, prev, next);
        this.calculatorForm.patchValue({input: result});
      });
  }

  onChange() {
    const {input, radix} = <{input: string; radix: NumberSystemRadix}>this.calculatorForm.value;
    this.calculatorForm.patchValue({input: Calculator.encode(input, radix)});
  }

  changeShift(shift: Shift) {
    this.calculatorForm.patchValue({shift});
  }

  isActiveShift(shift: Shift) {
    const shiftState = this.calculatorForm.get('shift')?.value;
    return shift === shiftState;
  }

  addOperatorToInput(value: string) {
    const {input} = this.calculatorForm.value;
    this.calculatorForm.patchValue({input: input + ` ${value} `});
  }
  addRightShiftOperatorToInput() {
    const {input, shift} = <{input: string; shift: Shift}>this.calculatorForm.value;
    if (shift === Shift.ArithmeticShift)
      this.calculatorForm.patchValue({input: input + ` ${OperatorSymbol.RightShift} `});
    else this.calculatorForm.patchValue({input: input + ` ${OperatorSymbol.UnsignedRightShift} `});
  }
  addNumberToInput(value: string) {
    const {input} = <{input: string}>this.calculatorForm.value;
    this.calculatorForm.patchValue({input: input + value});
  }

  resetInput() {
    this.calculatorForm.patchValue({input: '0'});
  }

  backspace() {
    const {input} = this.calculatorForm.value;
    this.calculatorForm.patchValue({input: input.slice(0, -1)});
  }

  isOutOfRadix(numberRadix: NumberSystemRadix) {
    const {radix} = this.calculatorForm.value;
    return numberRadix > radix;
  }

  changeNegative() {
    const {input} = <{input: string}>this.calculatorForm.value;
    if (input.endsWith('-')) this.calculatorForm.patchValue({input: input.slice(0, -1)});
    else this.calculatorForm.patchValue({input: input + '-'});
  }

  notFunction() {
    const {input} = <{input: string}>this.calculatorForm.value;
    this.calculatorForm.patchValue({input: 'NOT ' + input});
    this.calculate();
  }

  calculate() {
    const {input, radix} = <{input: string; radix: NumberSystemRadix}>this.calculatorForm.value;
    const result: string = Calculator.calculate(input, radix);
    this.calculatorForm.patchValue({input: result});
  }
}
