import AbstractClockService from './AbstractClockService.js';
import injector from 'wire-dependency-injection';

class UtcClockService extends AbstractClockService {
  public getDate() {
    return new Date().toLocaleString('en-US', { timeZone: 'UTC' });
  }
}

// The registering of our bean will be triggered at the import of this file
injector.registerBean('utcClockService', UtcClockService);
