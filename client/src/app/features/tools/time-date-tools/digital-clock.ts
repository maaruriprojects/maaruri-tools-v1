import { Component, signal, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-digital-clock',
  imports: [],
  template: `
    <div class="dc">
      <div class="dc__display">{{ time() }}</div>
      <div class="dc__date">{{ date() }}</div>
    </div>
  `,
  styles: [`
    .dc {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--mt-space-4);
      padding: var(--mt-space-8) var(--mt-space-4);
    }
    .dc__display {
      font-size: clamp(3rem, 10vw, 6rem);
      font-weight: var(--mt-font-bold);
      color: var(--mt-primary-700);
      font-variant-numeric: tabular-nums;
      letter-spacing: 0.05em;
      line-height: 1;
    }
    .dc__date {
      font-size: var(--mt-text-lg);
      color: var(--mt-text-muted);
    }
  `],
})
export class DigitalClock implements OnInit, OnDestroy {
  readonly time = signal<string>('00:00:00');
  readonly date = signal<string>('');
  private timer: ReturnType<typeof setInterval> | null = null;

  ngOnInit(): void {
    this.update();
    this.timer = setInterval(() => this.update(), 1000);
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }

  private update(): void {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    this.time.set(`${h}:${m}:${s}`);
    this.date.set(
      now.toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    );
  }
}
