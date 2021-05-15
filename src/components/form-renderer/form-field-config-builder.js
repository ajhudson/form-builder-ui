// @ts-nocheck
export const FormFieldTypes = {
  TEXT: 'text'
};

export const ValidationTypes = {
  MANDATORY: 'mandatory'
};

function FormFieldConfigBuilder() {
  this.formField = {};

  function createFormField(fieldId, fieldName, displayName, fieldType) {
    this.formField = {
      fieldId,
      fieldName,
      displayName,
      fieldType,
      options: null,
      validationRules: {}
    };

    return this;
  }

  function addValidationToFormField(validationType) {
    if (typeof this.formField !== 'object') {
      return this;
    }

    switch (validationType) {
      case ValidationTypes.MANDATORY:
        this.formField.validationRules.mandatory = {
          enabled: true,
          errorMessage: `${this.formField.displayName} is required.`
        };
        break;

      default:
        break;
    }

    return this;
  }

  function getFormFieldConfig() {
    return this.formField;
  }

  return {
    createFormField,
    addValidationToFormField,
    getFormFieldConfig
  };
}

export default FormFieldConfigBuilder;
