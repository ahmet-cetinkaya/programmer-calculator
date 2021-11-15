import {Calculator} from 'src/app/helpers/Calculator';
import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NumberSystemRadix, Shift, numberSystems} from './../../helpers/NumberSystem';
import {OperatorSymbol} from './../../helpers/Calculator';
import {pairwise, startWith} from 'rxjs/operators';
import {String as ACString} from 'src/app/helpers/String';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnInit {
  calculatorForm!: FormGroup;
  @ViewChild('calculatorInput', {static: false}) calculatorInput!: ElementRef;

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
      input: ['', [Validators.required]],
      radix: [String(NumberSystemRadix.Binary), [Validators.required]],
      shift: [Shift.ArithmeticShift, [Validators.required]],
    });
    this.calculatorForm
      .get('radix')
      ?.valueChanges.pipe(startWith(String(NumberSystemRadix.Binary)), pairwise())
      .subscribe(([prev, next]: [any, any]) => {
        const {input} = this.calculatorForm.value;
        if (!input) return;
        const result = Calculator.convertRadixInInput(input, prev, next);
        this.calculatorForm.patchValue({input: result});
      });
  }

  onChange() {
    const {input, radix} = <{input: string; radix: NumberSystemRadix}>this.calculatorForm.value;
    if (!input) return;
    this.calculatorForm.patchValue({input: Calculator.encode(input, radix)});
  }

  changeShift(shift: Shift) {
    this.calculatorForm.patchValue({shift});
  }

  addOperatorToInput(value: string) {
    const {input} = this.calculatorForm.value;
    const index = this.calculatorInput.nativeElement.selectionEnd;
    this.calculatorForm.patchValue({
      input: ACString.addToIndex(input, index, ` ${value} `),
    });
  }

  addRightShiftOperatorToInput() {
    const {input, shift} = <{input: string; shift: Shift}>this.calculatorForm.value;
    const index = this.calculatorInput.nativeElement.selectionEnd;
    if (shift === Shift.ArithmeticShift)
      this.calculatorForm.patchValue({
        input: ACString.addToIndex(input, index, ` ${OperatorSymbol.RightShift} `),
      });
    else
      this.calculatorForm.patchValue({
        input: ACString.addToIndex(input, index, ` ${OperatorSymbol.UnsignedRightShift} `),
      });
  }

  addNumberToInput(value: string) {
    const {input} = <{input: string}>this.calculatorForm.value;
    const index = this.calculatorInput.nativeElement.selectionEnd;
    this.calculatorForm.patchValue({
      input: ACString.addToIndex(input, index, value),
    });
  }

  resetInput() {
    this.calculatorForm.patchValue({input: ''});
  }

  backspace() {
    const {input} = <{input: string}>this.calculatorForm.value;
    const index = this.calculatorInput.nativeElement.selectionEnd;
    if (!input) return;
    this.calculatorForm.patchValue({input: ACString.removeFromIndex(input, index)});
  }

  isOutOfRadix(numberRadix: NumberSystemRadix) {
    const {radix} = <{radix: NumberSystemRadix}>this.calculatorForm.value;
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
    if (!input) return;
    const result: string = Calculator.calculate(input, radix);
    this.calculatorForm.patchValue({input: result});
  }

  setFocus(): void {
    const calculatorInputElement = this.calculatorInput.nativeElement;
    calculatorInputElement.focus();
  }

  isActiveShift(shift: Shift) {
    const shiftState = this.calculatorForm.get('shift')?.value;
    return shift === shiftState;
  }
}
