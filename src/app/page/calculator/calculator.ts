import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-calculator',
  imports: [],
  templateUrl: './calculator.html',
  styleUrl: './calculator.scss'
})
export class Calculator {
  @Input() id!: any;
  @Output() close = new EventEmitter<string>();
  @ViewChild('popup') popup!: ElementRef;
  expreValue: string = '';
  isFocused: boolean = false;

  isDragging = false;
  offsetX = 0;
  offsetY = 0;

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isDragging && this.popup) {
      const popup = this.popup.nativeElement;
      popup.style.top = `${event.clientY - this.offsetY}px`;
      popup.style.left = `${event.clientX - this.offsetX}px`;
    }
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.isDragging = false;
  }

  startDrag(event: MouseEvent) {
    this.isDragging = true;
    const rect = this.popup.nativeElement.getBoundingClientRect();
    this.offsetX = event.clientX - rect.left;
    this.offsetY = event.clientY - rect.top;
  }

  setFocus(state: boolean) {
    this.isFocused = state;
  }

  onKeyPress(event: KeyboardEvent) {
    if (!this.isFocused) {
      return;
    }

    const key = event.key;
    if (/\d|\+|\-|\*|\/|\./.test(key)) {
      this.expreValue += key;
    } else if ((key === 'Enter' || key === '=') && this.expreValue) {
      this.calculate();
    } else if (key === 'Backspace' && this.expreValue) {
      this.expreValue = this.expreValue.slice(0, -1);
    }
  }

  press(button: string) {
    if (button === 'C') {
      this.expreValue = '';
    } else if (button === '=') {
      if (this.expreValue) {
        this.calculate();
      }
    } else {
      this.expreValue += button;
    }
  }

  calculate() {
    try {
      this.expreValue = eval(this.expreValue);
    } catch {
      this.expreValue = 'Error';
    }
  }

  closePopup() {
    this.close.emit(this.id);
  }
}
