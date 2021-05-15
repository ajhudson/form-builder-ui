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
  const [mandatoryCheck, setMandatoryCheck] = useState(fieldStateInitialiser(false));

  const onTextInput = (e) => {
    console.log(`${e.target.name}: ${e.target.value}`);

    const updatedFieldValues = deepCopyFieldState(
      fieldVals,
      e.target.name,
      e.target.value
    );
    setFieldVals(updatedFieldValues);
  };

  useEffect(() => {
    console.log(fieldVals);
  }, [fieldVals]);

  const loadingModal = (
    <LoadingModal isLoading={isLoading} message="Form is loading..." />
  );

  /*
  const fieldPassesMandatoryCheck = (field) => {
    const val = fieldVals[field.fieldName].toString();
    const isMandatory = field.validationRules.mandatory.value;

    if (!isMandatory) {
      return false;
    }

    return val.trim().length === 0;
  };
  */

  const dynamicForm = (
    <Container>
      <Row>
        <h1>{formData.formName}</h1>
      </Row>
      <Row>
        <Form>
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

              <MandatoryValidationError displayName={f.displayName} show="true" />
            </FormGroup>
          ))}
        </Form>
      </Row>
      <Row style={{ marginTop: '10px' }}>
        <Col>
          <Button disabled={!isFormValid}>Submit</Button>
        </Col>
      </Row>
    </Container>
  );

  return <div>{isLoading ? loadingModal : dynamicForm}</div>;
};

export default RenderDynamicForm;
