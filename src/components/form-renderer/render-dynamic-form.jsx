import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
  Container,
  Row
} from 'reactstrap';
import LoadingModal from '../loading-modal/loading-modal';
import jsonData from '../assets/form-data.json';

const RenderDynamicForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFormValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState({});

  const onTextInput = (e) => {
    setFormData({ [e.target.name]: e.target.value, ...formData });
  };

  /*
  useEffect(async () => {
    const loadDataPromise = async () => {
      let data = null;
      setTimeout(() => {
        data = jsonData;
      }, 1000);

      return data;
    };

    const loadedFormData = await loadDataPromise();
    console.log('form data: ', loadedFormData);
  }, []);
  */

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  return <LoadingModal isLoading={isLoading} message="Form is loading..." />;
};

export default RenderDynamicForm;

/*
<div className="container">
            <h1>Rendering a Dynamic Form</h1>
      
            <Form>
              <FormGroup>
                <Label>First Name</Label>
                <Input type="text" name="firstname" id="firstname" onKeyUp={onTextInput} />
              </FormGroup>
            </Form>
          </div>
          */
