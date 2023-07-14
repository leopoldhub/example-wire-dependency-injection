import AbstractClockService from './AbstractClockService.js';
import dependencyInjector from 'wire-dependency-injection';

class UtcClockService extends AbstractClockService {
  public getDate() {
    return new Date().toLocaleString('en-US', { timeZone: 'UTC' });
  }
}

dependencyInjector.registerBean('utcClockService', UtcClockService);
