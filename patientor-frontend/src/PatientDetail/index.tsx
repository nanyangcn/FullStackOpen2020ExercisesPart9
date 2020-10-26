import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Icon, Table, Button } from 'semantic-ui-react';

import AddEntryModal from '../AddEntryModal';
import {
  Patient,
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  NewEntry,
} from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue, updatePatient } from '../state';
import { addEntry } from '../state/reducer';

const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  const [{ diagnosis }] = useStateValue();
  const heartColor = () => {
    switch (entry.healthCheckRating) {
      case 0:
        return 'green';
      case 1:
        return 'yellow';
      case 2:
        return 'orange';
      case 3:
        return 'red';
      default:
        return undefined;
    }
  };

  return (
    <Table celled>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <h4>
              {entry.date} <Icon name={'user md'} size='large' />
            </h4>
            <p>specialist: {entry.specialist}</p>
            <i style={{ color: 'grey' }}>{entry.description}</i> <br />
            <Icon name='heart' color={heartColor()} />
            <ul>
              {entry.diagnosisCodes &&
                entry.diagnosisCodes.map((code, i) => (
                  <li key={i}>
                    {code}: {diagnosis[code]?.name}
                  </li>
                ))}
            </ul>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  const [{ diagnosis }] = useStateValue();

  return (
    <Table celled>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <h4>
              {entry.date} <Icon name={'hospital'} size='large' />
            </h4>
            <p>specialist: {entry.specialist}</p>
            <i style={{ color: 'grey' }}>{entry.description}</i>
            <p>
              {entry.discharge.date}: {entry.discharge.criteria}
            </p>
            <ul>
              {entry.diagnosisCodes &&
                entry.diagnosisCodes.map((code, i) => (
                  <li key={i}>
                    {code}: {diagnosis[code]?.name}
                  </li>
                ))}
            </ul>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

const OccupationalHealthcare: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
  const [{ diagnosis }] = useStateValue();

  return (
    <Table celled>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <h4>
              {entry.date} <Icon name={'stethoscope'} size='large' />{' '}
              {entry.employerName}
            </h4>
            <p>specialist: {entry.specialist}</p>
            <i style={{ color: 'grey' }}>{entry.description}</i>
            <p>
              {entry.sickLeave && 'sick leave, '} start:{' '}
              {entry.sickLeave && entry.sickLeave.startDate} , end:{' '}
              {entry.sickLeave && entry.sickLeave.endDate}
            </p>
            <ul>
              {entry.diagnosisCodes &&
                entry.diagnosisCodes.map((code, i) => (
                  <li key={i}>
                    {code}: {diagnosis[code]?.name}
                  </li>
                ))}
            </ul>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};
const EntryDetail: React.FC<{ entry: Entry }> = ({ entry }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheck entry={entry} />;
    case 'Hospital':
      return <Hospital entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcare entry={entry} />;
    default:
      return assertNever(entry);
  }
};

const PatientDetail: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewPatient = async (values: NewEntry) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(id, newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  const getPatientDetail = async () => {
    if (!patients[id]?.ssn || !patients[id]?.entries) {
      try {
        const { data: patient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(updatePatient(patient));
      } catch (e) {
        console.error(e);
      }
    }
  };
  getPatientDetail();

  const genderIcon = () => {
    switch (patients[id]?.gender) {
      case 'male':
        return 'mars';
      case 'female':
        return 'venus';
      default:
        return 'genderless';
    }
  };

  const entries = (): Entry[] => {
    if (!patients[id]?.entries || patients[id].entries?.length === 0) {
      return [];
    }
    return patients[id].entries as Entry[];
  };

  return (
    <div className='App'>
      <h3>
        {patients[id]?.name}
        <Icon name={genderIcon()} />
      </h3>
      <div>ssn: {patients[id]?.ssn}</div>
      <div>occupation: {patients[id]?.occupation}</div>
      <h4>entries</h4>
      <div>
        {entries().map((entry) => (
          <EntryDetail key={entry.id} entry={entry} />
        ))}
      </div>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  );
};

export default PatientDetail;
