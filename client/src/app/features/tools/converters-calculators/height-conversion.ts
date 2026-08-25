import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-height-conversion',
  imports: [FormsModule],
  template: `
    <div class="hc">
      <div class="hc__row">
        <div class="hc__field">
          <label for="feet">Feet</label>
          <input id="feet" type="number" [(ngModel)]="feet" (ngModelChange)="fromFeetInches()" placeholder="5" step="0.01" />
        </div>
        <div class="hc__field">
          <label for="inches">Inches</label>
          <input id="inches" type="number" [(ngModel)]="inches" (ngModelChange)="fromFeetInches()" placeholder="9" step="0.01" />
        </div>
      </div>
      <div class="hc__row">
        <div class="hc__field">
          <label for="cm">Centimeters</label>
          <input id="cm" type="number" [(ngModel)]="cm" (ngModelChange)="fromCm()" placeholder="175.26" step="0.01" />
        </div>
        <div class="hc__field">
          <label for="meters">Meters</label>
          <input id="meters" type="number" [(ngModel)]="meters" (ngModelChange)="fromMeters()" placeholder="1.7526" step="0.0001" />
        </div>
      </div>

      <div class="hc__summary">
        @if (cm) {
          <p class="hc__summary-text">
            {{ feet }} ft {{ inches }} in = {{ cm }} cm = {{ meters }} m
          </p>
        } @else {
          <p class="hc__hint">Enter a value in any field to convert.</p>
        }
      </div>
    </div>
  `,
  styles: [`
    .hc {
      display: flex;
      flex-direction: column;
      gap: var(--mt-space-4);
      max-width: 520px;
      margin: 0 auto;
      padding: var(--mt-space-6) var(--mt-space-4);
    }
    .hc__row {
      display: flex;
      gap: var(--mt-space-4);
    }
    .hc__field {
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
    .hc__summary {
      text-align: center;
      padding: var(--mt-space-4);
      background: var(--mt-primary-50);
      border-radius: var(--mt-radius-lg);
    }
    .hc__summary-text {
      font-size: var(--mt-text-base);
      font-weight: var(--mt-font-semibold);
      color: var(--mt-primary-700);
      margin: 0;
    }
    .hc__hint {
      color: var(--mt-text-muted);
      font-size: var(--mt-text-sm);
      margin: 0;
    }
  `],
})
export class HeightConversion {
  feet: number | null = null;
  inches: number | null = null;
  cm: number | null = null;
  meters: number | null = null;

  fromFeetInches(): void {
    if (this.feet === null && this.inches === null) return;
    const f = this.feet ?? 0;
    const i = this.inches ?? 0;
    const totalCm = f * 30.48 + i * 2.54;
    this.cm = Math.round(totalCm * 100) / 100;
    this.meters = Math.round((totalCm / 100) * 10000) / 10000;
  }

  fromCm(): void {
    if (this.cm === null) return;
    const c = this.cm;
    this.meters = Math.round((c / 100) * 10000) / 10000;
    const totalInches = c / 2.54;
    const ft = Math.floor(totalInches / 12);
    const inch = Math.round((totalInches - ft * 12) * 100) / 100;
    this.feet = ft;
    this.inches = inch;
  }

  fromMeters(): void {
    if (this.meters === null) return;
    const c = this.meters * 100;
    this.cm = Math.round(c * 100) / 100;
    const totalInches = c / 2.54;
    const ft = Math.floor(totalInches / 12);
    const inch = Math.round((totalInches - ft * 12) * 100) / 100;
    this.feet = ft;
    this.inches = inch;
  }
}
