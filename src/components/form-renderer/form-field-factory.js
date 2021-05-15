export const FormFieldTypes = {
  TEXT: 'text'
};

export const ValidationTypes = {
  MANDATORY: 'mandatory'
};

function FormFieldFactory() {
  function createFormField(fieldId, fieldName, displayName, fieldType) {
    return {
      fieldId,
      fieldName,
      displayName,
      fieldType,
      options: null,
      validationRules: {}
    };
  }

  function addValidationToFormField(formField, validationType) {
    const updatedFormField = { ...formField };

    switch (validationType) {
      case ValidationTypes.MANDATORY:
        updatedFormField.validationRules.mandatory = {
          enabled: true,
          errorMessage: `${formField.displayName} is required.`
        };

        return updatedFormField;

      default:
        return updatedFormField;
    }
  }

  return {
    createFormField,
    addValidationToFormField
  };
}

export default FormFieldFactory;
