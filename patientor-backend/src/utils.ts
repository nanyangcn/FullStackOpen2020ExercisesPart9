/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  NewPatient,
  Gender,
  Entry,
  NewEntry,
  EntryType,
  Diagnosis,
  HealthCheckRating,
  Discharge,
  SickLeave,
} from './types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const isEntry = (entries: any): entries is Entry[] => {
  return Array.isArray(entries);
};

const isEntryType = (type: any): type is EntryType => {
  return Object.values(EntryType).includes(type);
};

const isDiagnosisCodes = (
  diagnosisCodes: Array<any>
): diagnosisCodes is Array<Diagnosis['code']> => {
  return diagnosisCodes.every((diagnosis) => typeof diagnosis === 'string');
};

const isHealthCheckRating = (
  healthCheckRating: any
): healthCheckRating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(healthCheckRating);
};

const isDischarge = (discharge: any): discharge is Discharge => {
  if (
    !discharge.date ||
    !isDate(discharge.date) ||
    !discharge.criteria ||
    !isString(discharge.criteria)
  ) {
    return false;
  }
  return true;
};

const isSickLeave = (sickLeave: any): sickLeave is SickLeave => {
  if (
    !sickLeave.startDate ||
    !isDate(sickLeave.startDate) ||
    !sickLeave.endDate ||
    !isDate(sickLeave.endDate)
  ) {
    return false;
  }
  return true;
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name: ${JSON.stringify(name)}`);
  }
  return name;
};

const parseDateOfBirth = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(
      `Incorrect or missing dateOfBirth: ${JSON.stringify(date)}`
    );
  }
  return date;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error(`Incorrect or missing ssn: ${JSON.stringify(ssn)}`);
  }
  return ssn;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${JSON.stringify(gender)}`);
  }
  return gender;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(
      `Incorrect or missing occupation: ${JSON.stringify(occupation)}`
    );
  }
  return occupation;
};

const parseEntries = (entries: any): Entry[] => {
  if (!entries) {
    return [];
  }
  if (!isEntry(entries)) {
    throw new Error(`Incorrect or missing entries: ${JSON.stringify(entries)}`);
  }
  return entries;
};

const parseType = (type: any): EntryType => {
  if (!type || !isEntryType(type)) {
    throw new Error(
      `Incorrect or missing entry:type : ${JSON.stringify(type)}`
    );
  }
  return type;
};

const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error(
      `Incorrect or missing description: ${JSON.stringify(description)}`
    );
  }
  return description;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${JSON.stringify(date)}`);
  }
  return date;
};

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error(
      `Incorrect or missing specialist: ${JSON.stringify(specialist)}`
    );
  }
  return specialist;
};

const parseDiagnosisCodes = (diagnosisCodes: any): Array<Diagnosis['code']> => {
  if (!diagnosisCodes) {
    return [];
  }
  if (!Array.isArray(diagnosisCodes) || !isDiagnosisCodes(diagnosisCodes)) {
    throw new Error(
      `Incorrect diagnosisCodes: ${JSON.stringify(diagnosisCodes)}`
    );
  }
  return diagnosisCodes;
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if (
    healthCheckRating === undefined ||
    !isHealthCheckRating(healthCheckRating)
  ) {
    throw new Error(
      `Incorrect or missing healthCheckRating: ${JSON.stringify(
        healthCheckRating
      )}`
    );
  }
  return healthCheckRating;
};

const parseDischarge = (discharge: any): Discharge => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error(
      `Incorrect or missing discharge: ${JSON.stringify(discharge)}`
    );
  }
  return discharge;
};

const parseEmployerName = (employerName: any): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error(
      `Incorrect or missing employerName: ${JSON.stringify(employerName)}`
    );
  }
  return employerName;
};

const parseSickLeave = (sickLeave: any): SickLeave | undefined => {
  if (!sickLeave) {
    return undefined;
  }
  if (!isSickLeave(sickLeave)) {
    throw new Error(`Incorrect sickLeave: ${JSON.stringify(sickLeave)}`);
  }
  return sickLeave;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: parseEntries(object.entries),
  };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toNewEntry = (object: any): NewEntry => {
  const type = parseType(object.type);
  const entry = {
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
  };

  switch (type) {
    case 'HealthCheck':
      return {
        ...entry,
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
    case 'Hospital':
      return {
        ...entry,
        type: 'Hospital',
        discharge: parseDischarge(object.discharge),
      };
    case 'OccupationalHealthcare':
      return {
        ...entry,
        type: 'OccupationalHealthcare',
        employerName: parseEmployerName(object.employerName),
        sickLeave: parseSickLeave(object.sickLeave),
      };
    default:
      throw new Error(
        `Incorrect or missing entry:type : ${JSON.stringify(type)}`
      );
  }
};
