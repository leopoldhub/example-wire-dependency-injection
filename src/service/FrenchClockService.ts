import AbstractClockService, { SERVICE } from './AbstractClockService.js';
import dependencyManager, { LAZY } from 'wire-dependency-injection';

export class FrenchClockService extends AbstractClockService {
  static {
    // The registering of our bean will be triggered at the import of this file
    // The lazy behaviour makes it not declare until we request it
    dependencyManager.instance('service.french-clock', FrenchClockService, {
      behaviour: LAZY,
      category: SERVICE,
    });
  }

  public getDate() {
    return new Date().toLocaleString('en-US', { timeZone: 'Europe/Paris' });
  }
}
