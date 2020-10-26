import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';

import { TextField, NumberField, DiagnosisSelection } from './FormField';
import { NewHealthCheckEntry } from '../types';

export type EntryFormValues = NewHealthCheckEntry;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const HealthCheckForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  return (
    <Formik
      initialValues={{
        description: '',
        specialist: '',
        date: '',
        type: 'HealthCheck',
        healthCheckRating: 0,
        diagnosisCodes: undefined,
      }}
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
        if (values.date && !Date.parse(values.date)) {
          errors.date = 'Incorrect format date';
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.healthCheckRating) {
          errors.healthCheckRating = requiredError;
        }
        if (values.healthCheckRating > 3 || values.healthCheckRating < 0) {
          errors.healthCheckRating = 'Health Check Rating must be 0-3';
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
              label='HealthCheckRating'
              placeholder='0-3'
              name='healthCheckRating'
              component={NumberField}
              min={0}
              max={3}
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

export default HealthCheckForm;
