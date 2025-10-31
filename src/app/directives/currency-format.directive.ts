import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[currency]',
  standalone: true
})
export class CurrencyFormatDirective implements OnChanges {
  @Input('currency') value!: number | string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('value' in changes) {
      this.formatValue();
    }
  }

  private formatValue(): void {
    let num = Number(this.value);

    if (isNaN(num)) {
      this.renderer.setProperty(this.el.nativeElement, 'textContent', this.value || '');
      return;
    }

    // Format number with 2 decimal places
    const formattedValue = `৳${num.toLocaleString('en-BD', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;

    // Apply text
    this.renderer.setProperty(this.el.nativeElement, 'textContent', formattedValue);

    // Apply styles
    this.renderer.setStyle(this.el.nativeElement, 'text-align', 'right');
    this.renderer.setStyle(this.el.nativeElement, 'font-weight', 'bold');
    this.renderer.setStyle(this.el.nativeElement, 'color', num < 0 ? 'red' : 'green');
  }
}
