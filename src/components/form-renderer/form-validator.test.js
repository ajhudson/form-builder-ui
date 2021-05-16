// @ts-nocheck
import FormConfigBuilder from './form-config-builder';
import FormFieldConfigBuilder, {
  FormFieldTypes,
  ValidationTypes
} from './form-field-config-builder';
import FormValidator from './form-validator';

describe('form validator tests', () => {
  it('should determine if a mandatory form field which is empty is not valid', () => {
    const fieldBuilder = new FormFieldConfigBuilder();
    const firstNameField = fieldBuilder
      .createFormField(101, 'firstName', 'First Name', FormFieldTypes.TEXT)
      .addValidationToFormField(ValidationTypes.MANDATORY)
      .build();

    const formBuilder = new FormConfigBuilder();
    const formConfig = formBuilder
      .createForm(1, 'Test Form')
      .addField(firstNameField)
      .build();

    const formValues = {
      firstName: ' '
    };

    const formValidator = new FormValidator();
    formValidator.validate(formConfig, formValues);
  });
});
