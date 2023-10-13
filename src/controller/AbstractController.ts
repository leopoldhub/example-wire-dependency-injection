import { BeanCategory } from 'wire-dependency-injection';
import { Request, Response } from 'express';

export const CONTROLLER: BeanCategory = 'CONTROLLER';

export default abstract class AbstractController {
  protected constructor(protected readonly path: string) {}

  public getPath() {
    return this.path;
  }

  public abstract execute(req: Request, res: Response): void;
}
