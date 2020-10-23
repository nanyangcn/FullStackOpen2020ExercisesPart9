import express from 'express';

import patientService from '../services/patientService';
import { toNewPatient, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPublicPatient());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientService.findPatientById(id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addNewPatient(newPatient);
    res.json(addedPatient);
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(err.message);
  }
});

router.post('/:id/entries', (req, res) => {
  const id = req.params.id;
  try {
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addNewEntry(newEntry, id);
    res.json(addedEntry);
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(err.message);
  }
});
export default router;
