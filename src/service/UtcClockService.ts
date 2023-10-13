import AbstractClockService, { SERVICE } from './AbstractClockService.js';
import dependencyManager, { LAZY } from 'wire-dependency-injection';

class UtcClockService extends AbstractClockService {
  public getDate() {
    return new Date().toLocaleString('en-US', { timeZone: 'UTC' });
  }
}

// The registering of our bean will be triggered at the import of this file
// The lazy behaviour makes it not declare until we request it
dependencyManager.instance('service.utc-clock', UtcClockService, {
  behaviour: LAZY,
  category: SERVICE,
});
