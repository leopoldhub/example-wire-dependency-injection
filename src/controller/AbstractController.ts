import { BeanType } from 'wire-dependency-injection';
import { Request, Response } from 'express';

export const CONTROLLER_BEAN_TYPE: BeanType = 'controller';

export default abstract class AbstractController {
  public constructor(protected readonly path: string) {}

  public getPath() {
    return this.path;
  }

  public abstract execute(req: Request, res: Response): void;
}
