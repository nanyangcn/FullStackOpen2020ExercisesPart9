import patientData from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { Entry, NewEntry, NewPatient, Patient, PublicPatient } from '../types';

const getPatients = (): Array<Patient> => {
  return patientData;
};

const getPublicPatient = (): Array<PublicPatient> => {
  return patientData.map((patient) => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
  }));
};

const findPatientById = (id: string): Patient | undefined => {
  return patientData.find((patient) => patient.id === id);
};

const addNewPatient = (patient: NewPatient): PublicPatient => {
  const newPatient = { ...patient, id: uuid() };
  patientData.push(newPatient);
  return newPatient;
};

const addNewEntry = (entry: NewEntry, id: string): Entry => {
  const newEntry = { ...entry, id: uuid() };
  const patient = patientData.find((patient) => patient.id === id);
  if (!patient) {
    throw new Error(`patient not found by id: ${id}`);
  }
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getPublicPatient,
  findPatientById,
  addNewPatient,
  addNewEntry,
};
