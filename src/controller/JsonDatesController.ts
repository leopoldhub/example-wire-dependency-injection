import AbstractController, {
  CONTROLLER_BEAN_TYPE,
} from './AbstractController.js';
import injector, { Bean } from 'wire-dependency-injection';
import { Request, Response } from 'express';
import AbstractClockService from '../service/AbstractClockService.js';
import FrenchClockService from '../service/FrenchClockService.js';
import UtcClockService from '../service/UtcClockService.js';

class JsonDatesController extends AbstractController {
  private frenchClockService: FrenchClockService = injector.autoWire(
    FrenchClockService,
    (b) => (this.frenchClockService = b)
  );
  private utcClockService: AbstractClockService = injector.autoWire(
    UtcClockService,
    (b) => (this.utcClockService = b)
  );

  public constructor(bean: Bean) {
    super('/' + bean.getId());
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public execute(_: Request, res: Response) {
    res.send({
      frenchTime: this.frenchClockService.getDate(),
      utcTime: this.utcClockService?.getDate(),
    });
  }
}

// The registering of our bean will be triggered at the import of this file
injector.registerBean(JsonDatesController, { type: CONTROLLER_BEAN_TYPE });
