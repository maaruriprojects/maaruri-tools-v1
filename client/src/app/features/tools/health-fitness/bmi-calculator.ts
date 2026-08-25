import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bmi-calculator',
  imports: [FormsModule],
  template: `
    <div class="bmi">
      <div class="bmi__row">
        <div class="bmi__field">
          <label for="weight">Weight (kg)</label>
          <input id="weight" type="number" [(ngModel)]="weight" (ngModelChange)="calc()" placeholder="70" />
        </div>
        <div class="bmi__field">
          <label for="height">Height (cm)</label>
          <input id="height" type="number" [(ngModel)]="height" (ngModelChange)="calc()" placeholder="175" />
        </div>
      </div>

      @if (bmiValue() !== null) {
        <div class="bmi__result" [class]="'bmi__result--' + bmiCategory().key">
          <div class="bmi__value">{{ bmiValue() }}</div>
          <div class="bmi__category">{{ bmiCategory().label }}</div>
          <div class="bmi__bar">
            <div class="bmi__bar-fill" [style.width.%]="bmiPercent()"></div>
          </div>
          <div class="bmi__scale">
            <span>Underweight</span><span>Normal</span><span>Overweight</span><span>Obese</span>
          </div>
        </div>
      } @else {
        <p class="bmi__hint">Enter your weight and height to calculate your BMI.</p>
      }
    </div>
  `,
  styles: [`
    .bmi {
      display: flex;
      flex-direction: column;
      gap: var(--mt-space-5);
      max-width: 480px;
      margin: 0 auto;
      padding: var(--mt-space-6) var(--mt-space-4);
    }
    .bmi__row {
      display: flex;
      gap: var(--mt-space-4);
    }
    .bmi__field {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: var(--mt-space-2);
      label {
        font-size: var(--mt-text-sm);
        font-weight: var(--mt-font-medium);
        color: var(--mt-heading);
      }
      input {
        padding: var(--mt-space-3);
        border: 1px solid var(--mt-border-strong);
        border-radius: var(--mt-radius-md);
        font-size: var(--mt-text-base);
        font-family: var(--mt-font-sans);
        color: var(--mt-text);
        outline: none;
        &:focus { border-color: var(--mt-primary-400); }
      }
    }
    .bmi__result {
      text-align: center;
      padding: var(--mt-space-6);
      border-radius: var(--mt-radius-lg);
      background: var(--mt-primary-50);
    }
    .bmi__value {
      font-size: var(--mt-text-4xl);
      font-weight: var(--mt-font-bold);
      color: var(--mt-primary-700);
    }
    .bmi__category {
      font-size: var(--mt-text-lg);
      font-weight: var(--mt-font-semibold);
      margin-bottom: var(--mt-space-4);
    }
    .bmi__result--underweight .bmi__category { color: var(--mt-warning); }
    .bmi__result--normal .bmi__category { color: var(--mt-success); }
    .bmi__result--overweight .bmi__category { color: var(--mt-warning); }
    .bmi__result--obese .bmi__category { color: var(--mt-error); }
    .bmi__bar {
      height: 8px;
      background: var(--mt-neutral-200);
      border-radius: var(--mt-radius-full);
      overflow: hidden;
      margin-bottom: var(--mt-space-2);
    }
    .bmi__bar-fill {
      height: 100%;
      background: var(--mt-primary);
      border-radius: var(--mt-radius-full);
      transition: width var(--mt-transition-base);
    }
    .bmi__scale {
      display: flex;
      justify-content: space-between;
      font-size: var(--mt-text-xs);
      color: var(--mt-text-muted);
    }
    .bmi__hint {
      color: var(--mt-text-muted);
      text-align: center;
      font-size: var(--mt-text-sm);
    }
  `],
})
export class BmiCalculator {
  weight: number | null = null;
  height: number | null = null;
  readonly bmiValue = signal<number | null>(null);

  readonly bmiCategory = computed(() => {
    const v = this.bmiValue();
    if (v === null) return { key: 'none', label: '' };
    if (v < 18.5) return { key: 'underweight', label: 'Underweight' };
    if (v < 25) return { key: 'normal', label: 'Normal' };
    if (v < 30) return { key: 'overweight', label: 'Overweight' };
    return { key: 'obese', label: 'Obese' };
  });

  readonly bmiPercent = computed(() => {
    const v = this.bmiValue();
    if (v === null) return 0;
    return Math.min(100, Math.max(0, ((v - 15) / 25) * 100));
  });

  calc(): void {
    if (this.weight && this.height && this.weight > 0 && this.height > 0) {
      const h = this.height / 100;
      this.bmiValue.set(Math.round((this.weight / (h * h)) * 10) / 10);
    } else {
      this.bmiValue.set(null);
    }
  }
}
