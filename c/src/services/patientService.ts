import patientData from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { NewPatient, Patient, PatientWithoutSsn } from '../types';

const getPatients = (): Array<Patient> => {
  return patientData;
};

const getPatientsWithoutSsn = (): Array<PatientWithoutSsn> => {
  return patientData.map((patient) => {
    delete patient.ssn;
    return patient;
  });
};

const addNewPatient = (patient: NewPatient): Patient => {
  const newPatient = { ...patient, id: uuid() };
  patientData.push(newPatient);
  return newPatient;
};
export default { getPatients, getPatientsWithoutSsn, addNewPatient };
