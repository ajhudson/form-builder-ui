import { FormFieldValidator } from './form-field-validator';

function FormValidator() {
  this.validationResult = null;

  function validate(formConfig, formValues) {
    let failedCheckCount = 0;
    const fieldValidator = new FormFieldValidator();
    const result = {
      isValid: false,
      fields: {}
    };

    for (const [fieldName, fieldValue] of Object.entries(formValues)) {
      const fieldConfig = formConfig.fields.find((f) => f.fieldName === fieldName);

      if (fieldConfig) {
        const validationResult = fieldValidator.validateFormField(
          fieldConfig,
          fieldValue
        );

        if (!validationResult.hasPassed) {
          failedCheckCount += 1;
        }

        result.fields[fieldName] = validationResult;
      }
    }

    result.isValid = failedCheckCount === 0;
    this.validationResult = result;

    console.clear();
    console.log(result);

    return this;
  }

  function hasResult() {
    return this.validationResult !== null;
  }

  function getResult() {
    return this.validationResult;
  }

  function isFormValid() {
    return this.validationResult.isValid;
  }

  function isFieldValid(fieldName) {
    console.log(this.validationResult);
    return this.validationResult.fields[fieldName].every((rules) => rules.hasPassed);
  }

  function getErrorMessagesForField(fieldName) {
    const ret = this.validationResult.fields[fieldName].reduce(
      (prev, curr) => [
        ...prev,
        { validationType: curr.validationType, errorMessage: curr.errorMessage }
      ],
      []
    );

    return ret;
  }

  return {
    validate,
    hasResult,
    getResult,
    isFormValid,
    isFieldValid,
    getErrorMessagesForField
  };
}

export default FormValidator;
