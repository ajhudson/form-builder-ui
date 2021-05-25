import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormConfigBuilder from './form-config-builder';
import FormFieldConfigBuilder from './form-field-config-builder';
import FormFieldTypes from './form-field-types';
import ValidationTypes from './validation-types';
import RenderDynamicForm from './render-dynamic-form';

describe('render dynamic form tests', () => {
  const buildFormConfigWithMandatoryTextField = () => {
    const fieldBuilder = new FormFieldConfigBuilder();
    const formBuilder = new FormConfigBuilder();

    const firstNameField = fieldBuilder
      .createFormField(1, 'firstName', 'First Name', FormFieldTypes.TEXT)
      .addValidationToFormField(ValidationTypes.MANDATORY)
      .build();

    const formConfig = formBuilder
      .createForm('testForm', 'Simple Form')
      .addField(firstNameField)
      .build();

    return formConfig;
  };

  it('should render a form with a mandatory text field on', () => {
    const formConfig = buildFormConfigWithMandatoryTextField();
    const { container } = render(<RenderDynamicForm formConfig={formConfig} />);

    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument();
    expect(container.querySelector('#mandatory-mark-firstname')).toBeInTheDocument();
  });

  it.only('should render a mandatory warning when the user has touched the field', () => {
    const formConfig = buildFormConfigWithMandatoryTextField();
    const { container } = render(<RenderDynamicForm formConfig={formConfig} />);

    const firstNameElement = screen.getByPlaceholderText('First Name');
    userEvent.type(firstNameElement, 'andy');
    firstNameElement.setSelectionRange(0, 4);
    userEvent.type(firstNameElement, '{backspace}');

    //screen.debug();
  });
});
