import { BeanCategory } from 'wire-dependency-injection';

export const SERVICE: BeanCategory = 'SERVICE';

export default abstract class AbstractClockService {
  public abstract getDate(): string;
}
