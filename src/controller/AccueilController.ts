import AbstractController, { CONTROLLER } from './AbstractController.js';
import { Request, Response } from 'express';
import dependencyManager, { LAZY } from 'wire-dependency-injection';

export class AccueilController extends AbstractController {
  static {
    // The registering of our bean will be triggered at the import of this file
    dependencyManager.instance('controller.accueil', this, {
      // The lazy behaviour makes it not declare until we request it
      behaviour: LAZY,
      // The category indicates which group the bean should be in
      category: CONTROLLER,
      // We indicate that the bean should be passed all the controllers (except itself) on instance
      wiring: [{ category: CONTROLLER }],
    });
  }

  // receiving all the controllers on instance
  public constructor(private controllers: Array<AbstractController>) {
    super('/');
  }

  public execute(_: Request, res: Response) {
    // updating the loaded controllers
    this.controllers = dependencyManager.wire({ category: CONTROLLER });
    const controllerList = this.controllers.filter((c) => c !== this);
    res.send(
      controllerList
        .map((controller) => {
          return `<a href="${controller.getPath()}">${controller.getPath()}</a>`;
        })
        .join('<br/>')
    );
  }
}
