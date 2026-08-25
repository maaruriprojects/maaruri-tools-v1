import { Component, signal, OnInit, OnDestroy, ElementRef, viewChild } from '@angular/core';

@Component({
  selector: 'app-analog-clock',
  imports: [],
  template: `
    <div class="ac">
      <svg #clock class="ac__svg" viewBox="0 0 200 200" width="240" height="240">
        <!-- Face -->
        <circle cx="100" cy="100" r="95" fill="var(--mt-surface)" stroke="var(--mt-primary-300)" stroke-width="3" />
        <!-- Hour ticks -->
        @for (tick of ticks(); track tick.angle) {
          <line
            [attr.x1]="tick.x1" [attr.y1]="tick.y1"
            [attr.x2]="tick.x2" [attr.y2]="tick.y2"
            stroke="var(--mt-neutral-400)" stroke-width="2"
          />
        }
        <!-- Numbers -->
        @for (num of numbers(); track num.n) {
          <text [attr.x]="num.x" [attr.y]="num.y" text-anchor="middle" dominant-baseline="central"
            font-size="14" font-weight="600" fill="var(--mt-heading)">{{ num.n }}</text>
        }
        <!-- Hour hand -->
        <line x1="100" y1="100" [attr.x2]="hourHand().x" [attr.y2]="hourHand().y"
          stroke="var(--mt-primary-700)" stroke-width="4" stroke-linecap="round" />
        <!-- Minute hand -->
        <line x1="100" y1="100" [attr.x2]="minuteHand().x" [attr.y2]="minuteHand().y"
          stroke="var(--mt-primary-500)" stroke-width="3" stroke-linecap="round" />
        <!-- Center dot -->
        <circle cx="100" cy="100" r="5" fill="var(--mt-primary-700)" />
      </svg>
      <div class="ac__time">{{ digitalTime() }}</div>
    </div>
  `,
  styles: [`
    .ac {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--mt-space-4);
      padding: var(--mt-space-6) var(--mt-space-4);
    }
    .ac__svg {
      max-width: 100%;
      height: auto;
    }
    .ac__time {
      font-size: var(--mt-text-xl);
      font-weight: var(--mt-font-semibold);
      color: var(--mt-text-muted);
      font-variant-numeric: tabular-nums;
    }
  `],
})
export class AnalogClock implements OnInit, OnDestroy {
  readonly clock = viewChild<ElementRef<SVGElement>>('clock');

  readonly ticks = signal<Array<{ angle: number; x1: number; y1: number; x2: number; y2: number }>>([]);
  readonly numbers = signal<Array<{ n: number; x: number; y: number }>>([]);
  readonly hourHand = signal({ x: 100, y: 60 });
  readonly minuteHand = signal({ x: 100, y: 40 });
  readonly digitalTime = signal('--:--');

  private timer: ReturnType<typeof setInterval> | null = null;

  ngOnInit(): void {
    this.buildTicks();
    this.buildNumbers();
    this.update();
    this.timer = setInterval(() => this.update(), 1000);
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }

  private buildTicks(): void {
    const t: Array<{ angle: number; x1: number; y1: number; x2: number; y2: number }> = [];
    for (let i = 0; i < 12; i++) {
      const angle = (i * 30 - 90) * (Math.PI / 180);
      t.push({
        angle: i,
        x1: 100 + Math.cos(angle) * 88,
        y1: 100 + Math.sin(angle) * 88,
        x2: 100 + Math.cos(angle) * 80,
        y2: 100 + Math.sin(angle) * 80,
      });
    }
    this.ticks.set(t);
  }

  private buildNumbers(): void {
    const n: Array<{ n: number; x: number; y: number }> = [];
    for (let i = 1; i <= 12; i++) {
      const angle = (i * 30 - 90) * (Math.PI / 180);
      n.push({ n: i, x: 100 + Math.cos(angle) * 68, y: 100 + Math.sin(angle) * 68 });
    }
    this.numbers.set(n);
  }

  private update(): void {
    const now = new Date();
    const h = now.getHours() % 12;
    const m = now.getMinutes();
    const s = now.getSeconds();

    const hourAngle = ((h + m / 60) * 30 - 90) * (Math.PI / 180);
    const minuteAngle = ((m + s / 60) * 6 - 90) * (Math.PI / 180);

    this.hourHand.set({
      x: 100 + Math.cos(hourAngle) * 40,
      y: 100 + Math.sin(hourAngle) * 40,
    });
    this.minuteHand.set({
      x: 100 + Math.cos(minuteAngle) * 60,
      y: 100 + Math.sin(minuteAngle) * 60,
    });

    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(m).padStart(2, '0');
    this.digitalTime.set(`${hh}:${mm}`);
  }
}
