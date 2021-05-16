// @ts-nocheck
import ValidationTypes from './validation-types';

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

  function build() {
    return this.formField;
  }

  return {
    createFormField,
    addValidationToFormField,
    build
  };
}

export default FormFieldConfigBuilder;
