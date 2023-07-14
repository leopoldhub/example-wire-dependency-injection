import AbstractController, {
  CONTROLLER_BEAN_TYPE,
} from './AbstractController.js';
import dependencyInjector from 'wire-dependency-injection';
import { Request, Response } from 'express';
import AbstractClockService from '../service/AbstractClockService.js';

class JsonDatesController extends AbstractController {
  private frenchClockService?: AbstractClockService =
    dependencyInjector.autoWire(
      'frenchClockService',
      (b) => (this.frenchClockService = b)
    );
  private utcClockService?: AbstractClockService = dependencyInjector.autoWire(
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

dependencyInjector.registerBean(
  'jsonDatesController',
  JsonDatesController,
  CONTROLLER_BEAN_TYPE
);
