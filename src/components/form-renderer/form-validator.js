// @ts-nocheck
import { FormFieldValidator } from './form-field-validator';

function FormValidator() {
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

    return result;
  }

  return {
    validate
  };
}

export default FormValidator;
