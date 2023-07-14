import AbstractClockService from './AbstractClockService.js';
import dependencyInjector from 'wire-dependency-injection';

class FrenchClockService extends AbstractClockService {
  public getDate() {
    return new Date().toLocaleString('en-US', { timeZone: 'Europe/Paris' });
  }
}

dependencyInjector.registerBean('frenchClockService', FrenchClockService);
