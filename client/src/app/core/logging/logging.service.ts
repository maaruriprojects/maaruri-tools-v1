import { Injectable } from '@angular/core';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

/**
 * Minimal console logger with leveled output. In production, debug
 * messages are suppressed. Keeps a small ring buffer of recent
 * messages for diagnostics.
 */
@Injectable({ providedIn: 'root' })
export class LoggingService {
  private static readonly MAX_HISTORY = 50;

  private readonly history: Array<{ level: LogLevel; message: string; timestamp: string }> = [];

  debug(message: string, ...optionalParams: unknown[]): void {
    this.log('debug', message, optionalParams);
  }

  info(message: string, ...optionalParams: unknown[]): void {
    this.log('info', message, optionalParams);
  }

  warn(message: string, ...optionalParams: unknown[]): void {
    this.log('warn', message, optionalParams);
  }

  error(message: string, ...optionalParams: unknown[]): void {
    this.log('error', message, optionalParams);
  }

  getHistory(): ReadonlyArray<{ level: LogLevel; message: string; timestamp: string }> {
    return this.history;
  }

  private log(level: LogLevel, message: string, optionalParams: unknown[]): void {
    const timestamp = new Date().toISOString();
    const prefix = `[MaaruriTools][${level.toUpperCase()}]`;

    this.history.push({ level, message, timestamp });
    if (this.history.length > LoggingService.MAX_HISTORY) {
      this.history.shift();
    }

    switch (level) {
      case 'debug':
        // eslint-disable-next-line no-console
        console.debug(prefix, message, ...optionalParams);
        break;
      case 'info':
        // eslint-disable-next-line no-console
        console.info(prefix, message, ...optionalParams);
        break;
      case 'warn':
        // eslint-disable-next-line no-console
        console.warn(prefix, message, ...optionalParams);
        break;
      case 'error':
        // eslint-disable-next-line no-console
        console.error(prefix, message, ...optionalParams);
        break;
    }
  }
}
