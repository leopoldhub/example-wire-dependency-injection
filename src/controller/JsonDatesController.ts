import AbstractController, {
  CONTROLLER_BEAN_TYPE,
} from './AbstractController.js';
import injector from 'wire-dependency-injection';
import { Request, Response } from 'express';
import AbstractClockService from '../service/AbstractClockService.js';

class JsonDatesController extends AbstractController {
  private frenchClockService?: AbstractClockService = injector.autoWire(
    'frenchClockService',
    (b) => (this.frenchClockService = b)
  );
  private utcClockService?: AbstractClockService = injector.autoWire(
    'utcClockService',
    (b) => (this.utcClockService = b)
  );

  public constructor() {
    super('/jsonDates');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public execute(_: Request, res: Response) {
    res.send({
      frenchTime: this.frenchClockService?.getDate(),
      utcTime: this.utcClockService?.getDate(),
    });
  }
}

// The registering of our bean will be triggered at the import of this file
injector.registerBean(
  'jsonDatesController',
  JsonDatesController,
  CONTROLLER_BEAN_TYPE
);
