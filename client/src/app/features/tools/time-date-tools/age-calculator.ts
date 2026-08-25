import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-age-calculator',
  imports: [FormsModule],
  template: `
    <div class="ac-age">
      <div class="ac-age__field">
        <label for="dob">Date of Birth</label>
        <input id="dob" type="date" [(ngModel)]="birthDate" (ngModelChange)="calculate()" />
      </div>
      <div class="ac-age__field">
        <label for="target">Age at Date (optional)</label>
        <input id="target" type="date" [(ngModel)]="targetDate" (ngModelChange)="calculate()" />
      </div>

      @if (result()) {
        <div class="ac-age__result">
          <div class="ac-age__result-main">
            <span class="ac-age__num">{{ result()!.years }}</span>
            <span class="ac-age__unit">years</span>
            <span class="ac-age__num">{{ result()!.months }}</span>
            <span class="ac-age__unit">months</span>
            <span class="ac-age__num">{{ result()!.days }}</span>
            <span class="ac-age__unit">days</span>
          </div>
          <p class="ac-age__total">Total: {{ result()!.totalDays }} days ({{ result()!.totalWeeks }} weeks)</p>
        </div>
      } @else if (error()) {
        <p class="ac-age__error">{{ error() }}</p>
      } @else {
        <p class="ac-age__hint">Select your date of birth to calculate your age.</p>
      }
    </div>
  `,
  styles: [`
    .ac-age {
      display: flex;
      flex-direction: column;
      gap: var(--mt-space-4);
      max-width: 480px;
      margin: 0 auto;
      padding: var(--mt-space-6) var(--mt-space-4);
    }
    .ac-age__field {
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
    .ac-age__result {
      text-align: center;
      padding: var(--mt-space-6);
      background: var(--mt-primary-50);
      border-radius: var(--mt-radius-lg);
    }
    .ac-age__result-main {
      display: flex;
      align-items: baseline;
      justify-content: center;
      gap: var(--mt-space-2);
      flex-wrap: wrap;
    }
    .ac-age__num {
      font-size: var(--mt-text-3xl);
      font-weight: var(--mt-font-bold);
      color: var(--mt-primary-700);
    }
    .ac-age__unit {
      font-size: var(--mt-text-sm);
      color: var(--mt-text-muted);
    }
    .ac-age__total {
      margin: var(--mt-space-3) 0 0;
      font-size: var(--mt-text-sm);
      color: var(--mt-text-muted);
    }
    .ac-age__error {
      color: var(--mt-error);
      font-size: var(--mt-text-sm);
      text-align: center;
    }
    .ac-age__hint {
      color: var(--mt-text-muted);
      text-align: center;
      font-size: var(--mt-text-sm);
    }
  `],
})
export class AgeCalculator {
  birthDate = '';
  targetDate = '';
  readonly result = signal<{ years: number; months: number; days: number; totalDays: number; totalWeeks: number } | null>(null);
  readonly error = signal<string>('');

  calculate(): void {
    this.error.set('');
    if (!this.birthDate) {
      this.result.set(null);
      return;
    }
    const birth = new Date(this.birthDate);
    const target = this.targetDate ? new Date(this.targetDate) : new Date();

    if (birth > target) {
      this.error.set('Birth date must be before the target date.');
      this.result.set(null);
      return;
    }

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((target.getTime() - birth.getTime()) / 86400000);
    this.result.set({
      years,
      months,
      days,
      totalDays,
      totalWeeks: Math.floor(totalDays / 7),
    });
  }
}
