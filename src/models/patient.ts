import { prop, Typegoose, arrayProp } from 'typegoose';

export class Medication extends Typegoose {
  @prop({ required: true })
  MedicationName!: string;

  @prop({ required: true })
  Dose!: string;

  @prop({ required: true })
  StartDate!: Date;

  @prop()
  StopDate?: Date;
}

export class Patient extends Typegoose {
  @prop({ required: true })
  FirstName!: string;

  @prop({ required: true })
  LastName!: string;

  @prop()
  Temperature?: number;

  @prop()
  Pulse?: number;

  @arrayProp({ items: Medication })
  Medications?: Medication[];
}

export const PatientModel = new Patient().setModelForClass(Patient);
