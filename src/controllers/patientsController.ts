import { PatientModel, Patient } from '../models/patient';
import { OK, BAD_REQUEST, NO_CONTENT } from 'http-status-codes';
import { Request, Response } from 'express';
import { Controller, Middleware, Get, Post, Put, Delete } from '@overnightjs/core';

@Controller('api')
export class PatientsController {
  private static readonly updateOptions: { [key: string]: any } = {
    new: true,
    upsert: true,
  };

  @Get('patients')
  private getAll(req: Request, res: Response): void {
    PatientModel.find((err, patients) => {
      if (err) {
        res.status(BAD_REQUEST).json({ msg: `Server Error: ${err}` });
      } else {
        res.status(OK).json({ data: patients });
      }
    });
  }

  @Get('patient/:id')
  private getSingle(req: Request, res: Response): void {
    PatientModel.findById(req.params.id, (err, patient) => {
      if (err) {
        res.status(BAD_REQUEST).json({ msg: `Server Error: ${err}` });
      } else {
        res.status(OK).json({ data: patient });
      }
    });
  }

  @Get('patient/:id/medications')
  private getMedication(req: Request, res: Response): void {
    PatientModel.findById(req.params.id, (err, patient: Patient) => {
      if (err) {
        res.status(BAD_REQUEST).json({ msg: `Server Error: ${err}` });
      } else {
        res.status(OK).json({ data: patient.Medications || [] });
      }
    });
  }

  @Get('patient/:id/temperatureAndPulse')
  private getTemperatureAndPulse(req: Request, res: Response): void {
    PatientModel.findById(req.params.id, (err, patient: Patient) => {
      if (err) {
        res.status(BAD_REQUEST).json({ msg: `Server Error: ${err}` });
      } else {
        res.status(OK).json({
          data: {
            temperature: patient.Temperature,
            pulse: patient.Pulse,
          },
        });
      }
    });
  }

  @Post('patient/:id/temperatureAndPulse')
  private setTemperatureAndPulse(req: Request, res: Response): void {
    const updateParams: { [key: string]: string } = {};
    if (req.body.Temperature) {
      updateParams['Temperature'] = req.body.Temperature;
    }

    if (req.body.Pulse) {
      updateParams['Pulse'] = req.body.Pulse;
    }

    PatientModel.findByIdAndUpdate(
      req.params.id,
      updateParams,
      PatientsController.updateOptions,
      (err, updatedPatient) => {
        if (err) {
          res.status(BAD_REQUEST).send(`Server Error: ${err}`);
        } else {
          res.status(OK).json({ data: updatedPatient });
        }
      }
    );
  }
}
