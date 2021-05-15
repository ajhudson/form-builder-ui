// @ts-nocheck
import FormFieldFactory, {
  FormFieldTypes,
  ValidationTypes
} from './form-field-factory';

describe('form field factory tests', () => {
  let factory;

  beforeEach(() => {
    factory = new FormFieldFactory();
  });

  it('should create a text field with no validation rules', () => {
    const field = factory.createFormField(
      1,
      'firstName',
      'First Name',
      FormFieldTypes.TEXT
    );

    const expectedField = {
      fieldId: 1,
      fieldName: 'firstName',
      displayName: 'First Name',
      fieldType: 'text',
      options: null,
      validationRules: null
    };

    expect(field).toMatchObject(expectedField);
  });

  it.only('should create a text field with a mandatory rule', () => {
    let field = factory.createFormField(
      1,
      'firstName',
      'First Name',
      FormFieldTypes.TEXT
    );

    field = factory.addValidationToFormField(field, ValidationTypes.MANDATORY);

    const expectedField = {
      fieldId: 1,
      fieldName: 'firstName',
      displayName: 'First Name',
      fieldType: 'text',
      options: null,
      validationRules: {
        mandatory: { enabled: true, errorMessage: 'First Name is required.' }
      }
    };

    expect(field).toMatchObject(expectedField);
  });
});
