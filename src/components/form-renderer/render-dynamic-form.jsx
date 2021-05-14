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
import jsonData from '../assets/form-data';
import MandatoryValidationError from './mandatory-validation-error';

const RenderDynamicForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(jsonData);
  const [isFormValid, setIsFormValid] = useState(false);

  const onTextInput = (e) => {
    setFormData({ [e.target.name]: e.target.value, ...formData });
  };

  const onOverFormSubmitBtn = (e) => {
    console.log(e);
  };

  const loadingModal = (
    <LoadingModal isLoading={isLoading} message="Form is loading..." />
  );

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
                onKeyUp={onTextInput}
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
