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
import PropTypes, { shape } from 'prop-types';
import styled from 'styled-components/macro';
import LoadingModal from '../loading-modal/loading-modal';
//import formData from '../assets/form-data';
import MandatoryValidationError from './mandatory-validation-error';
import FormValidator from './form-validator';
import ValidationField from './validation-field';

const MandatoryMark = styled.span.attrs((props) => ({
  id: props.id.toLowerCase()
}))`
  color: red;
  font-weight: bold;
`;

const deepCopyFieldState = (fieldState, fieldName, updatedFieldValue) => {
  const tempFieldState = { ...fieldState };
  delete tempFieldState[fieldName];
  const newTempFieldState = { [fieldName]: updatedFieldValue, ...tempFieldState };

  return newTempFieldState;
};

const RenderDynamicForm = ({ formConfig }) => {
  const fieldStateInitialiser = (initValue) => {
    return formConfig.fields.reduce((prev, curr) => {
      return { ...prev, [curr.fieldName]: initValue };
    }, {});
  };

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
    for (const [currentFieldName, currentFieldValue] of Object.entries(fieldVals)) {
      //console.log('field name: ', currentFieldName);
      //console.log('field value: ', currentFieldValue);
      //const isFieldValid = formValidator.isFieldValid(currentFieldName);
    }

    console.clear();
    console.log(formValidator.getResult());

    return null;
  };

  useEffect(() => {
    formValidator.validate(formConfig, fieldVals);
    setIsFormValid(formValidator.isFormValid());
    renderValidationFields();
  }, [fieldVals]);

  const loadingModal = (
    <LoadingModal isLoading={isLoading} message="Form is loading..." />
  );

  const dynamicForm = (
    <Container>
      <Row>
        <h1>{formConfig.formName}</h1>
      </Row>
      <Row>
        <Form autoComplete="off">
          {formConfig.fields.map((f) => (
            <FormGroup key={f.fieldId}>
              <Label>
                {f.displayName}
                {/*f.validationRules.mandatory.enabled && (
                  <MandatoryMark id={`mandatory-mark-${f.fieldName}`}>
                    &nbsp;*
                  </MandatoryMark>
                )*/}
              </Label>

              <Input
                type="text"
                name={f.fieldName}
                id={f.fieldName}
                placeholder={f.displayName}
                onChange={onTextInput}
              />

              {/* this will have to be an array of objects being passed into <ValidationField> component */}
              {renderValidationFields()}
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

RenderDynamicForm.propTypes = {
  formConfig: PropTypes.object.isRequired
};
