import AbstractController, {
  CONTROLLER_BEAN_TYPE,
} from './AbstractController.js';
import injector from 'wire-dependency-injection';
import { Request, Response } from 'express';
import AbstractClockService from '../service/AbstractClockService.js';

class PrettyDatesController extends AbstractController {
  private frenchClockService?: AbstractClockService = injector.autoWire(
    'frenchClockService',
    (b) => (this.frenchClockService = b)
  );
  private utcClockService?: AbstractClockService = injector.autoWire(
    'utcClockService',
    (b) => (this.utcClockService = b)
  );

  public constructor() {
    super('/prettyDates');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public execute(_: Request, res: Response) {
    res.send(
      'Dates:<br>' +
        'French: ' +
        this.frenchClockService?.getDate() +
        '<br>' +
        'UTC: ' +
        this.utcClockService?.getDate() +
        '<br>'
    );
  }
}

// The registering of our bean will be triggered at the import of this file
injector.registerBean(
  'prettyDatesController',
  PrettyDatesController,
  CONTROLLER_BEAN_TYPE
);
