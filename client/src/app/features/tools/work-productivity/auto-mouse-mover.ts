import { Component, signal, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-auto-mouse-mover',
  imports: [],
  template: `
    <div class="amm">
      <div class="amm__status" [class.amm__status--running]="running()">
          <span class="amm__status-dot" [class.amm__status-dot--on]="running()"></span>
          {{ running() ? 'Running — mouse movement active' : 'Stopped' }}
        </div>

        <div class="amm__field">
          <label for="interval">Movement Interval (seconds)</label>
          <input
            id="interval"
            type="range"
            min="5" max="120" step="5"
            [value]="intervalSecs()"
            (input)="onIntervalChange($event)"
            [disabled]="running()"
          />
          <span class="amm__interval-value">{{ intervalSecs() }}s</span>
        </div>

        <button
          class="amm__btn"
          [class.amm__btn--stop]="running()"
          (click)="toggle()"
        >
          {{ running() ? 'Stop' : 'Start' }}
        </button>

        <p class="amm__info">
          The auto mouse mover simulates small mouse movements at the set interval
          to prevent your system from going to sleep or showing as idle.
          Keep this tab open while running.
        </p>

        @if (moveCount() > 0) {
          <p class="amm__count">Total movements: {{ moveCount() }}</p>
        }
      </div>
  `,
  styles: [`
    .amm {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--mt-space-5);
      max-width: 460px;
      margin: 0 auto;
      padding: var(--mt-space-6) var(--mt-space-4);
    }
    .amm__status {
      display: flex;
      align-items: center;
      gap: var(--mt-space-2);
      padding: var(--mt-space-2) var(--mt-space-4);
      border-radius: var(--mt-radius-full);
      font-size: var(--mt-text-sm);
      font-weight: var(--mt-font-medium);
      background: var(--mt-neutral-100);
      color: var(--mt-text-muted);
      &--running {
        background: var(--mt-success-50);
        color: var(--mt-success-700);
      }
    }
    .amm__status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--mt-neutral-400);
      &--on {
        background: var(--mt-success);
        animation: amm-pulse 1.5s ease-in-out infinite;
      }
    }
    @keyframes amm-pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }
    .amm__field {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--mt-space-2);
      width: 100%;
      label {
        font-size: var(--mt-text-sm);
        font-weight: var(--mt-font-medium);
        color: var(--mt-heading);
      }
      input[type="range"] {
        width: 100%;
        max-width: 300px;
        accent-color: var(--mt-primary);
      }
    }
    .amm__interval-value {
      font-size: var(--mt-text-sm);
      font-weight: var(--mt-font-semibold);
      color: var(--mt-primary-700);
    }
    .amm__btn {
      padding: var(--mt-space-3) var(--mt-space-8);
      border: none;
      border-radius: var(--mt-radius-md);
      font-size: var(--mt-text-base);
      font-weight: var(--mt-font-semibold);
      cursor: pointer;
      background: var(--mt-primary);
      color: #fff;
      transition: background var(--mt-transition-fast);
      &:hover { background: var(--mt-primary-700); }
      &--stop {
        background: var(--mt-error);
        &:hover { background: var(--mt-error-700); }
      }
    }
    .amm__info {
      font-size: var(--mt-text-sm);
      color: var(--mt-text-muted);
      text-align: center;
      line-height: var(--mt-leading-normal);
    }
    .amm__count {
      font-size: var(--mt-text-xs);
      color: var(--mt-text-muted);
    }
  `],
})
export class AutoMouseMover implements OnDestroy {
  readonly running = signal<boolean>(false);
  readonly intervalSecs = signal<number>(30);
  readonly moveCount = signal<number>(0);
  private timer: ReturnType<typeof setInterval> | null = null;

  toggle(): void {
    if (this.running()) {
      this.stop();
    } else {
      this.start();
    }
  }

  start(): void {
    this.running.set(true);
    this.moveCount.set(0);
    this.doMove();
    this.timer = setInterval(() => this.doMove(), this.intervalSecs() * 1000);
  }

  stop(): void {
    this.running.set(false);
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  onIntervalChange(e: Event): void {
    const val = parseInt((e.target as HTMLInputElement).value, 10);
    this.intervalSecs.set(val);
  }

  ngOnDestroy(): void {
    this.stop();
  }

  private doMove(): void {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const evt = new MouseEvent('mousemove', {
      clientX: x,
      clientY: y,
      bubbles: true,
    });
    document.dispatchEvent(evt);
    this.moveCount.update((c) => c + 1);
  }
}
