import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';

import { TextField, SelectField, EntryTypeOption } from './FormField';
import { NewEntry, EntryType, NewBaseEntry } from '../types';

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
  const [entryType, setEntryType] = React.useState('Hospital' as EntryType);

  const initialValues = (): EntryFormValues => {
    const baseInitialValue: NewBaseEntry = {
      description: '',
      specialist: '',
      date: '',
      // diagnosisCodes: '',
    };
    switch (entryType) {
      case 'HealthCheck':
        return {
          ...baseInitialValue,
          type: 'HealthCheck',
          healthCheckRating: 0,
        };
      case 'Hospital':
        return {
          ...baseInitialValue,
          type: 'Hospital',
          description: '',
          discharge: {
            date: '',
            criteria: '',
          },
        };
      case 'OccupationalHealthcare':
        return {
          ...baseInitialValue,
          type: 'OccupationalHealthcare',
          employerName: '',
          sickLeave: {
            startDate: '',
            endDate: '',
          },
        };
      default:
        throw new Error('Invalid entry type');
    }
  };

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
      <Formik
        initialValues={initialValues()}
        onSubmit={onSubmit}
        validate={(values) => {
          const requiredError = 'Field is required';
          const errors: { [field: string]: string } = {};
          if (!values.description) {
            errors.description = requiredError;
          }
          if (!values.date) {
            errors.date = requiredError;
          }
          if (!values.specialist) {
            errors.specialist = requiredError;
          }
          if (values.type === 'HealthCheck' && !values.healthCheckRating) {
            errors.healthCheckRating = requiredError;
          }
          if (values.type === 'Hospital' && !values.discharge.criteria) {
            errors['discharge.criteria'] = requiredError;
          }
          if (values.type === 'Hospital' && !values.discharge.date) {
            errors['discharge.date'] = requiredError;
          }
          if (
            values.type === 'OccupationalHealthcare' &&
            !values.employerName
          ) {
            errors.employerName = requiredError;
          }
          console.log(errors);
          return errors;
        }}
      >
        {({ values, isValid, dirty }) => {
          values.type = entryType;
          return (
            <Form className='form ui'>
              <Field
                label='Description'
                placeholder='description'
                name='description'
                component={TextField}
              />
              <Field
                label='Date'
                placeholder='YYYY-MM-DD'
                name='date'
                component={TextField}
              />
              <Field
                label='Specialist'
                placeholder='specialist'
                name='specialist'
                component={TextField}
              />
              {values.type === 'HealthCheck' && (
                <Field
                  label='HealthCheckRating'
                  placeholder='healthCheckRating'
                  name='healthCheckRating'
                  component={TextField}
                />
              )}
              {values.type === 'Hospital' && (
                <Field
                  label='Discharge date'
                  placeholder='YYYY-MM-DD'
                  name='discharge.date'
                  component={TextField}
                />
              )}
              {values.type === 'Hospital' && (
                <Field
                  label='Discharge criteria'
                  placeholder='discharge criteria'
                  name='discharge.criteria'
                  component={TextField}
                />
              )}
              {values.type === 'OccupationalHealthcare' && (
                <Field
                  label='Employer name'
                  placeholder='employer name'
                  name='employerName'
                  component={TextField}
                />
              )}
              {values.type === 'OccupationalHealthcare' && (
                <Field
                  label='Sick leave start date'
                  placeholder='YYYY-MM-DD'
                  name='sickLeave.startDate'
                  component={TextField}
                />
              )}
              {values.type === 'OccupationalHealthcare' && (
                <Field
                  label='Sick leave end date'
                  placeholder='YYYY-MM-DD'
                  name='sickLeave.endDate'
                  component={TextField}
                />
              )}
              <Grid>
                <Grid.Column floated='left' width={5}>
                  <Button type='button' onClick={onCancel} color='red'>
                    Cancel
                  </Button>
                </Grid.Column>
                <Grid.Column floated='right' width={5}>
                  <Button
                    type='submit'
                    floated='right'
                    color='green'
                    disabled={!dirty || !isValid}
                  >
                    Add
                  </Button>
                </Grid.Column>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddEntryForm;
