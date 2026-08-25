import { Component, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocaleService } from '../../../core/config/locale.service';

@Component({
  selector: 'app-auto-loan-calculator',
  imports: [FormsModule],
  template: `
    <div class="alc">
      <div class="alc__row">
        <div class="alc__field">
          <label for="amount">Loan Amount ({{ currencySymbol() }})</label>
          <input id="amount" type="number" [(ngModel)]="amount" (ngModelChange)="calc()" placeholder="250000" />
        </div>
        <div class="alc__field">
          <label for="rate">Annual Interest Rate (%)</label>
          <input id="rate" type="number" [(ngModel)]="rate" (ngModelChange)="calc()" placeholder="9.5" step="0.1" />
        </div>
      </div>
      <div class="alc__field">
        <label for="term">Loan Term</label>
        <div class="alc__term-row">
          <input id="term" type="number" [(ngModel)]="term" (ngModelChange)="calc()" placeholder="60" />
          <select [(ngModel)]="termUnit" (ngModelChange)="calc()">
            <option value="months">Months</option>
            <option value="years">Years</option>
          </select>
        </div>
      </div>

      @if (monthlyPayment() !== null) {
        <div class="alc__result">
          <div class="alc__payment">
            <span class="alc__payment-label">Monthly Payment</span>
            <span class="alc__payment-value">{{ currencySymbol() }}{{ monthlyPayment() }}</span>
          </div>
          <div class="alc__breakdown">
            <div class="alc__breakdown-item">
              <span class="alc__breakdown-label">Total Interest</span>
              <span class="alc__breakdown-value">{{ currencySymbol() }}{{ totalInterest() }}</span>
            </div>
            <div class="alc__breakdown-item">
              <span class="alc__breakdown-label">Total Amount</span>
              <span class="alc__breakdown-value">{{ currencySymbol() }}{{ totalAmount() }}</span>
            </div>
          </div>
        </div>
      } @else {
        <p class="alc__hint">Enter loan amount, interest rate, and term to calculate your monthly payment.</p>
      }
    </div>
  `,
  styles: [`
    .alc {
      display: flex;
      flex-direction: column;
      gap: var(--mt-space-4);
      max-width: 520px;
      margin: 0 auto;
      padding: var(--mt-space-6) var(--mt-space-4);
    }
    .alc__row {
      display: flex;
      gap: var(--mt-space-4);
    }
    .alc__field {
      flex: 1;
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
    .alc__term-row {
      display: flex;
      gap: var(--mt-space-2);
      input { flex: 1; }
      select { width: auto; min-width: 100px; }
    }
    .alc__result {
      padding: var(--mt-space-6);
      background: var(--mt-primary-50);
      border-radius: var(--mt-radius-lg);
      text-align: center;
    }
    .alc__payment {
      display: flex;
      flex-direction: column;
      gap: var(--mt-space-1);
      margin-bottom: var(--mt-space-5);
    }
    .alc__payment-label {
      font-size: var(--mt-text-sm);
      color: var(--mt-text-muted);
    }
    .alc__payment-value {
      font-size: var(--mt-text-4xl);
      font-weight: var(--mt-font-bold);
      color: var(--mt-primary-700);
    }
    .alc__breakdown {
      display: flex;
      justify-content: center;
      gap: var(--mt-space-8);
    }
    .alc__breakdown-item {
      display: flex;
      flex-direction: column;
      gap: var(--mt-space-1);
    }
    .alc__breakdown-label {
      font-size: var(--mt-text-xs);
      color: var(--mt-text-muted);
    }
    .alc__breakdown-value {
      font-size: var(--mt-text-base);
      font-weight: var(--mt-font-semibold);
      color: var(--mt-heading);
    }
    .alc__hint {
      color: var(--mt-text-muted);
      text-align: center;
      font-size: var(--mt-text-sm);
    }
  `],
})
export class AutoLoanCalculator {
  private readonly locale = inject(LocaleService);
  readonly currencySymbol = this.locale.currencySymbol;

  amount: number | null = null;
  rate: number | null = null;
  term: number | null = null;
  termUnit: 'months' | 'years' = 'months';

  readonly monthlyPayment = signal<string | null>(null);
  readonly totalInterest = signal<string>('');
  readonly totalAmount = signal<string>('');

  calc(): void {
    if (!this.amount || !this.rate || !this.term) {
      this.monthlyPayment.set(null);
      return;
    }

    const months = this.termUnit === 'years' ? this.term * 12 : this.term;
    const r = this.rate / 100 / 12;
    const p = this.amount;

    if (r === 0) {
      const mp = p / months;
      this.setResults(mp, mp * months, p);
      return;
    }

    const factor = Math.pow(1 + r, months);
    const mp = (p * r * factor) / (factor - 1);
    const total = mp * months;
    this.setResults(mp, total - p, total);
  }

  private setResults(mp: number, interest: number, total: number): void {
    const fmt = (n: number) => n.toLocaleString(undefined, { maximumFractionDigits: 0 });
    this.monthlyPayment.set(fmt(Math.round(mp)));
    this.totalInterest.set(fmt(Math.round(interest)));
    this.totalAmount.set(fmt(Math.round(total)));
  }
}
