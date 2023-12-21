import AbstractController, { CONTROLLER } from './AbstractController.js';
import dependencyManager, { LAZY } from 'wire-dependency-injection';
import { Request, Response } from 'express';
import AbstractClockService from '../service/AbstractClockService.js';

export class JsonDatesController extends AbstractController {
  static {
    // The registering of our bean will be triggered at the import of this file
    // The lazy behaviour makes it not declare until we request it
    dependencyManager.instance('controller.json-dates', JsonDatesController, {
      behaviour: LAZY,
      category: CONTROLLER,
      wiring: ['service.french-clock', 'service.utc-clock'],
    });
  }

  // Receiving the wired controllers on instance one by one
  public constructor(
    private readonly frenchClockService: AbstractClockService,
    private readonly utcClockService: AbstractClockService
  ) {
    super('/JSON_Dates');
  }

  public execute(_: Request, res: Response) {
    res.send({
      frenchTime: this.frenchClockService.getDate(),
      utcTime: this.utcClockService.getDate(),
    });
  }
}
