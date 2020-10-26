import React from 'react';

import { EntryTypeOption } from './FormField';
import { NewEntry, EntryType } from '../types';
import HealthCheckForm from './HealthCheckForm';
import HospitalForm from './HospitalForm';
import OccupationalHealthcareForm from './OccupationalHealthcareForm';

export type EntryFormValues = NewEntry;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const entryTypeOptions: EntryTypeOption[] = [
  { value: EntryType.HealthCheck, label: 'HealthCheck' },
  { value: EntryType.Hospital, label: 'Hospital' },
  { value: EntryType.OccupationalHealthcare, label: 'OccupationalHealthcare' },
];

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [entryType, setEntryType] = React.useState('HealthCheck' as EntryType);

  return (
    <div>
      <h5>Entry Type</h5>
      <select
        value={entryType}
        onChange={({ target }) => setEntryType(target.value as EntryType)}
        className='ui dropdown'
      >
        {entryTypeOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label || option.value}
          </option>
        ))}
      </select>
      {entryType === 'HealthCheck' && (
        <HealthCheckForm onSubmit={onSubmit} onCancel={onCancel} />
      )}
      {entryType === 'Hospital' && (
        <HospitalForm onSubmit={onSubmit} onCancel={onCancel} />
      )}
      {entryType === 'OccupationalHealthcare' && (
        <OccupationalHealthcareForm onSubmit={onSubmit} onCancel={onCancel} />
      )}
    </div>
  );
};

export default AddEntryForm;
