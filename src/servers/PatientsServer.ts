import * as bodyParser from 'body-parser';
import { PatientsController } from '../controllers/patientsController';
import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import mongoose from 'mongoose';
import 'dotenv/config';

export class PatientsServerRouter extends Server {
  private readonly FRONT_END_MSG = 'OvernightJS with standard express router started.';
  private readonly START_MSG = 'OvernightJS with standard express router started on port: ';

  constructor() {
    super(true);
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.setupControllers();
  }

  private setupControllers(): void {
    super.addControllers([new PatientsController()]);
  }

  public start(port?: number): void {
    port = port || 3000;

    mongoose.connect(`${process.env.MONGO_URI}`, { useNewUrlParser: true }).then(async () => {
      this.app.get('*', (req, res) => {
        res.send(this.FRONT_END_MSG);
      });
      this.app.listen(port, () => {
        Logger.Imp(this.START_MSG + port);
      });
    });
  }
}
