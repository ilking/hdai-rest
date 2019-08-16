# To run:

`npm run serve`

# Edit URI for mongo DB in .env

# Endpoints:

- **GET** /api/patients - Get all patients
- **GET** /api/patient/<patient_id> - get all info for single patient
- **GET** /api/patient/<patient_id>/temperatureAndPulse - Get temperature and pulse as JSON object for single patient
- **POST** /api/patient/<patient_id>/temperatureAndPulse - Set temperature and pulse for patient
  - _Temperature_: Optional, number as temp
  - _Pulse_: Optionale, integer as bpm
