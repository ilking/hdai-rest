import * as path from 'path';
import * as fs from 'fs';
import { LoggerModes } from '@overnightjs/logger';
import mongoose from 'mongoose';
import 'dotenv/config';

// Set env variables
const logFilePath = path.join(__dirname, '../hdai-rest.log');
process.env.OVERNIGHT_LOGGER_FILEPATH = logFilePath;
process.env.OVERNIGHT_LOGGER_MODE = LoggerModes.Console;
process.env.OVERNIGHT_LOGGER_RM_TIMESTAMP = 'false';

// Remove current log file
(function removeFile() {
  try {
    fs.unlinkSync(logFilePath);
  } catch (e) {
    return;
  }
})();

// Import and start Server. Must be imported after configuring env variables.
import { PatientsServerRouter } from './servers/patientsServer';

const server = new PatientsServerRouter();
server.start(3000);
