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
import ValidationField from './validation-field';

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
  const [validationErrors, setValidationErrors] = useState([]);
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

  /*
  const shouldShowValidationField = (fieldName) => {
    if (!formValidator.hasResult()) {
      return false;
    }

    const hasFieldBeenTouched = fieldsTouched[fieldName] === true;
    const isFieldValid = formValidator.isFieldValid(fieldName);
    const showField = hasFieldBeenTouched && !isFieldValid;

    console.log(`show field for ${fieldName}: ${showField}`);

    return showField;
  };
  */

  const renderValidationFields = () => {
    for (const [fname, fval] of Object.entries(fieldVals)) {
      const isFieldValid = formValidator.isFieldValid(fname);

      console.log(`Field ${fname}:${fval} valid: ${isFieldValid}`);
    }
  };

  useEffect(() => {
    formValidator.validate(formData, fieldVals);
    setIsFormValid(formValidator.isFormValid());
    renderValidationFields();
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
