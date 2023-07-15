// We import and register our beans
import './beans.js';
import injector from 'wire-dependency-injection';
import express from 'express';
import AbstractController, {
  CONTROLLER_BEAN_TYPE,
} from './controller/AbstractController.js';
import FrenchClockService from './service/FrenchClockService.js';
import UtcClockService from './service/UtcClockService.js';

console.log('French date is', injector.wire(FrenchClockService).getDate());
console.log('UTC date is', injector.wire(UtcClockService).getDate());

const app = express();
const port = 3000;

injector
  .getContainer()
  ?.getBeansByType(CONTROLLER_BEAN_TYPE)
  .forEach((bean) => {
    if (bean.getType() === CONTROLLER_BEAN_TYPE) {
      const controller = bean.getInstance() as AbstractController;
      app.get(controller.getPath(), (req, res) => controller.execute(req, res));
      console.log(
        'registered controller:',
        bean.getId(),
        'for path:',
        controller.getPath()
      );
    }
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
