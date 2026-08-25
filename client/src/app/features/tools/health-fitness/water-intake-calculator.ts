import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-water-intake-calculator',
  imports: [FormsModule],
  template: `
    <div class="wic">
      <div class="wic__field">
        <label for="weight">Body Weight (kg)</label>
        <input id="weight" type="number" [(ngModel)]="weight" (ngModelChange)="calc()" placeholder="70" />
      </div>
      <div class="wic__field">
        <label for="activity">Activity Level</label>
        <select id="activity" [(ngModel)]="activity" (ngModelChange)="calc()">
          <option value="1.0">Sedentary (little/no exercise)</option>
          <option value="1.2">Light (1-3 days/week)</option>
          <option value="1.4">Moderate (3-5 days/week)</option>
          <option value="1.6">Active (6-7 days/week)</option>
          <option value="1.8">Intense (twice/day, intense)</option>
        </select>
      </div>

      @if (result() !== null) {
        <div class="wic__result">
          <div class="wic__amount">{{ result() }} <span class="wic__unit">liters/day</span></div>
          <p class="wic__glasses">That's about {{ glasses() }} glasses of water (250ml each)</p>
        </div>
      } @else {
        <p class="wic__hint">Enter your weight to calculate your daily water needs.</p>
      }
    </div>
  `,
  styles: [`
    .wic {
      display: flex;
      flex-direction: column;
      gap: var(--mt-space-4);
      max-width: 480px;
      margin: 0 auto;
      padding: var(--mt-space-6) var(--mt-space-4);
    }
    .wic__field {
      display: flex;
      flex-direction: column;
      gap: var(--mt-space-2);
      label {
        font-size: var(--mt-text-sm);
        font-weight: var(--mt-font-medium);
        color: var(--mt-heading);
      }
      input, select {
        padding: var(--mt-space-3);
        border: 1px solid var(--mt-border-strong);
        border-radius: var(--mt-radius-md);
        font-size: var(--mt-text-base);
        font-family: var(--mt-font-sans);
        color: var(--mt-text);
        background: var(--mt-surface);
        outline: none;
        &:focus { border-color: var(--mt-primary-400); }
      }
    }
    .wic__result {
      text-align: center;
      padding: var(--mt-space-6);
      background: var(--mt-primary-50);
      border-radius: var(--mt-radius-lg);
    }
    .wic__amount {
      font-size: var(--mt-text-4xl);
      font-weight: var(--mt-font-bold);
      color: var(--mt-primary-700);
    }
    .wic__unit {
      font-size: var(--mt-text-base);
      color: var(--mt-text-muted);
    }
    .wic__glasses {
      margin: var(--mt-space-3) 0 0;
      font-size: var(--mt-text-sm);
      color: var(--mt-text-muted);
    }
    .wic__hint {
      color: var(--mt-text-muted);
      text-align: center;
      font-size: var(--mt-text-sm);
    }
  `],
})
export class WaterIntakeCalculator {
  weight: number | null = null;
  activity: string = '1.0';
  readonly result = signal<number | null>(null);

  glasses = computed(() => {
    const v = this.result();
    return v !== null ? Math.round((v * 1000) / 250) : 0;
  });

  calc(): void {
    if (this.weight && this.weight > 0) {
      const base = this.weight * 0.033;
      const adjusted = base * parseFloat(this.activity);
      this.result.set(Math.round(adjusted * 10) / 10);
    } else {
      this.result.set(null);
    }
  }
}
