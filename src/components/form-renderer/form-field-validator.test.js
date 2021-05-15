// @ts-nocheck
import FormFieldConfigBuilder, {
  FormFieldTypes,
  ValidationTypes
} from './form-field-config-builder';
import { FormFieldValidator } from './form-field-validator';

describe('Form field tests', () => {
  let builder;

  beforeEach(() => {
    builder = new FormFieldConfigBuilder();
  });

  it('should fail mandatory check if the form field is empty and is configured to be mandatory', () => {
    const fieldConfig = builder
      .createFormField(1, 'firstName', 'First Name', FormFieldTypes.TEXT)
      .addValidationToFormField(ValidationTypes.MANDATORY)
      .getFormFieldConfig();

    const fieldValidator = new FormFieldValidator();
    const result = fieldValidator.validateFormField(fieldConfig, '');
    const expectedResult = {
      mandatoryCheckResult: {
        required: true,
        hasPassed: false,
        errorMessage: 'First Name is required.'
      }
    };

    expect(result).toMatchObject(expectedResult);
  });

  it('should pass mandatory check if the form field is empty and is configured to be optional', () => {
    const fieldConfig = builder
      .createFormField(1, 'firstName', 'First Name', FormFieldTypes.TEXT)
      .getFormFieldConfig();

    const fieldValidator = new FormFieldValidator();
    const result = fieldValidator.validateFormField(fieldConfig, '');

    const expectedResult = {
      mandatoryCheckResult: {
        required: false,
        hasPassed: true,
        errorMessage: null
      }
    };

    expect(result).toMatchObject(expectedResult);
  });
});
