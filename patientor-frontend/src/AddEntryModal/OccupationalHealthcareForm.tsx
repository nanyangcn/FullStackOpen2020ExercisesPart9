import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';

import { TextField, DiagnosisSelection } from './FormField';
import { NewOccupationalHealthcareEntry } from '../types';

export type EntryFormValues = NewOccupationalHealthcareEntry;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const OccupationalHealthcareForm: React.FC<Props> = ({
  onSubmit,
  onCancel,
}) => {
  return (
    <Formik
      initialValues={{
        description: '',
        specialist: '',
        date: '',
        type: 'OccupationalHealthcare',
        employerName: '',
        sickLeave: {
          startDate: '',
          endDate: '',
        },
        diagnosisCodes: undefined,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';
        const errors: {
          [field: string]: string | { [field: string]: string };
        } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (values.date && !Date.parse(values.date)) {
          errors.date = 'Incorrect format date';
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.employerName) {
          errors.employerName = requiredError;
        }
        if (values.sickLeave && !Date.parse(values.sickLeave.startDate)) {
          errors.sickLeave =
            typeof errors.sickLeave === 'object'
              ? { ...errors.sickLeave, startDate: 'Incorrect format date' }
              : { startDate: 'Incorrect format date' };
        }
        if (values.sickLeave && !Date.parse(values.sickLeave.endDate)) {
          errors.sickLeave =
            typeof errors.sickLeave === 'object'
              ? { ...errors.sickLeave, endDate: 'Incorrect format date' }
              : { endDate: 'Incorrect format date' };
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldTouched, setFieldValue }) => {
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
            <Field
              label='Diagnosis Code'
              name='diagnosisCode'
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              component={DiagnosisSelection}
            />
            <Field
              label='Employer name'
              placeholder='employer name'
              name='employerName'
              component={TextField}
            />
            <Field
              label='Sick leave start date'
              placeholder='YYYY-MM-DD'
              name='sickLeave.startDate'
              component={TextField}
            />
            <Field
              label='Sick leave end date'
              placeholder='YYYY-MM-DD'
              name='sickLeave.endDate'
              component={TextField}
            />
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
  );
};

export default OccupationalHealthcareForm;
