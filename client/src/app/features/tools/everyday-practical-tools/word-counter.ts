import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-word-counter',
  imports: [FormsModule],
  template: `
    <div class="wc">
      <div class="wc__field">
        <label for="text">Your Text</label>
        <textarea
          id="text"
          [(ngModel)]="text"
          (ngModelChange)="update()"
          placeholder="Type or paste your text here..."
          rows="8"
        ></textarea>
      </div>

      <div class="wc__stats">
        <div class="wc__stat">
          <span class="wc__stat-value">{{ words() }}</span>
          <span class="wc__stat-label">Words</span>
        </div>
        <div class="wc__stat">
          <span class="wc__stat-value">{{ characters() }}</span>
          <span class="wc__stat-label">Characters</span>
        </div>
        <div class="wc__stat">
          <span class="wc__stat-value">{{ charNoSpaces() }}</span>
          <span class="wc__stat-label">No Spaces</span>
        </div>
        <div class="wc__stat">
          <span class="wc__stat-value">{{ sentences() }}</span>
          <span class="wc__stat-label">Sentences</span>
        </div>
        <div class="wc__stat">
          <span class="wc__stat-value">{{ paragraphs() }}</span>
          <span class="wc__stat-label">Paragraphs</span>
        </div>
        <div class="wc__stat">
          <span class="wc__stat-value">{{ readingTime() }}</span>
          <span class="wc__stat-label">Reading Time</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .wc {
      display: flex;
      flex-direction: column;
      gap: var(--mt-space-5);
      padding: var(--mt-space-6) var(--mt-space-4);
    }
    .wc__field {
      display: flex;
      flex-direction: column;
      gap: var(--mt-space-2);
      label {
        font-size: var(--mt-text-sm);
        font-weight: var(--mt-font-medium);
        color: var(--mt-heading);
      }
      textarea {
        padding: var(--mt-space-4);
        border: 1px solid var(--mt-border-strong);
        border-radius: var(--mt-radius-md);
        font-size: var(--mt-text-base);
        font-family: var(--mt-font-sans);
        color: var(--mt-text);
        outline: none;
        resize: vertical;
        min-height: 160px;
        &:focus { border-color: var(--mt-primary-400); }
      }
    }
    .wc__stats {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: var(--mt-space-3);
    }
    .wc__stat {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--mt-space-1);
      padding: var(--mt-space-4);
      background: var(--mt-primary-50);
      border-radius: var(--mt-radius-md);
      text-align: center;
    }
    .wc__stat-value {
      font-size: var(--mt-text-2xl);
      font-weight: var(--mt-font-bold);
      color: var(--mt-primary-700);
    }
    .wc__stat-label {
      font-size: var(--mt-text-xs);
      color: var(--mt-text-muted);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
  `],
})
export class WordCounter {
  text = '';
  readonly words = signal<number>(0);
  readonly characters = signal<number>(0);
  readonly charNoSpaces = signal<number>(0);
  readonly sentences = signal<number>(0);
  readonly paragraphs = signal<number>(0);
  readonly readingTime = signal<string>('0s');

  update(): void {
    const t = this.text;
    this.characters.set(t.length);
    this.charNoSpaces.set(t.replace(/\s/g, '').length);
    this.words.set(t.trim() ? t.trim().split(/\s+/).length : 0);
    this.sentences.set(t.trim() ? (t.match(/[.!?]+(?:\s|$)/g)?.length ?? 1) : 0);
    this.paragraphs.set(t.trim() ? t.split(/\n\s*\n/).filter((p) => p.trim()).length || 1 : 0);
    const mins = this.words() / 200;
    if (mins < 1) {
      this.readingTime.set(`${Math.ceil(mins * 60)}s`);
    } else {
      this.readingTime.set(`${Math.ceil(mins)}min`);
    }
  }
}
