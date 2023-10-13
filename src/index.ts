// We import and register our beans
import './beans.js';
import dependencyManager from 'wire-dependency-injection';
import express from 'express';
import AbstractController, {
  CONTROLLER,
} from './controller/AbstractController.js';
import AbstractClockService from './service/AbstractClockService.js';

console.log(
  'French date is',
  dependencyManager.wire<AbstractClockService>('service.french-clock').getDate()
);
console.log(
  'UTC date is',
  dependencyManager.wire<AbstractClockService>('service.utc-clock').getDate()
);

const app = express();
const port = 3000;

dependencyManager
  .wire<Array<AbstractController>>({ category: CONTROLLER })
  .forEach((controller) => {
    app.get(controller.getPath(), (req, res) => controller.execute(req, res));
    console.log('registered controller:', controller.getPath());
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
