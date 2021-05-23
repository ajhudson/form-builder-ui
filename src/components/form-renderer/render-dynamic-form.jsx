// @ts-nocheck
import React, { useState, useEffect } from 'react';
import {
  Button,
  Container,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Col
} from 'reactstrap';
import LoadingModal from '../loading-modal/loading-modal';
import formData from '../assets/form-data';
import MandatoryValidationError from './mandatory-validation-error';
import FormValidator from './form-validator';

const fieldStateInitialiser = (initValue) => {
  return formData.fields.reduce((prev, curr) => {
    return { ...prev, [curr.fieldName]: initValue };
  }, {});
};

const deepCopyFieldState = (fieldState, fieldName, updatedFieldValue) => {
  const tempFieldState = { ...fieldState };
  delete tempFieldState[fieldName];
  const newTempFieldState = { [fieldName]: updatedFieldValue, ...tempFieldState };

  return newTempFieldState;
};

const RenderDynamicForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [fieldVals, setFieldVals] = useState(fieldStateInitialiser(''));
  const [fieldsTouched, setFieldsTouched] = useState(fieldStateInitialiser(false));
  const formValidator = new FormValidator();

  const onTextInput = (e) => {
    const updatedFieldValues = deepCopyFieldState(
      fieldVals,
      e.target.name,
      e.target.value
    );
    const touchedFields = deepCopyFieldState(fieldsTouched, e.target.name, true);

    setFieldVals(updatedFieldValues);
    setFieldsTouched(touchedFields);
  };

  const hasFieldBeenTouched = (fieldName) => fieldsTouched[fieldName] === true;

  useEffect(() => {
    console.log('IS FORM VALID: ', isFormValid);
  }, []);

  useEffect(() => {
    formValidator.validate(formData, fieldVals);
    setIsFormValid(formValidator.isFormValid());
  }, [fieldVals]);

  const loadingModal = (
    <LoadingModal isLoading={isLoading} message="Form is loading..." />
  );

  const dynamicForm = (
    <Container>
      <Row>
        <h1>{formData.formName}</h1>
      </Row>
      <Row>
        <Form autoComplete="off">
          {formData.fields.map((f) => (
            <FormGroup key={f.fieldId}>
              <Label>
                {f.displayName}
                {f.validationRules.mandatory.value && (
                  <span style={{ color: 'red', fontWeight: 'bold' }}>&nbsp;*</span>
                )}
              </Label>

              <Input
                type="text"
                name={f.fieldName}
                id={f.fieldName}
                onChange={onTextInput}
              />

              <MandatoryValidationError
                displayName={f.displayName}
                show={hasFieldBeenTouched(f.fieldName)}
              />
            </FormGroup>
          ))}
        </Form>
      </Row>
      <Row style={{ marginTop: '10px' }}>
        <Col>
          <Button disabled={!isFormValid}>Submit</Button>
        </Col>
      </Row>
      <Row>
        <Col>Is form valid: {isFormValid ? 'yes' : 'no'}</Col>
      </Row>
    </Container>
  );

  return <div>{isLoading ? loadingModal : dynamicForm}</div>;
};

export default RenderDynamicForm;
