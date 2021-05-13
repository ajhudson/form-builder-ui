import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Input, Label } from 'reactstrap';

const RenderDynamicForm = () => {
    const [isFormValid, setIsValid] = useState(false);
    const [formData, setFormData] = useState({});

    const onTextInput = e => {
        setFormData({[e.target.name]: e.target.value, ...formData});
    };

    return (
        <div className="container">
            <Form>
                <FormGroup>
                    <Label>First Name</Label>
                    <Input type="text" name="firstname" id="firstname" onKeyUp={onTextInput} />
                </FormGroup>
            </Form>
        </div>
    );
}

export default RenderDynamicForm;