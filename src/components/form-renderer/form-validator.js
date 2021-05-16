// @ts-nocheck
import { FormFieldValidator } from './form-field-validator';

function FormValidator() {
  function validate(formConfig, formValues) {
    let failedCheckCount = 0;
    const fieldValidator = new FormFieldValidator();

    for (const [fieldName, fieldValue] of Object.entries(formValues)) {
      const fieldConfig = formConfig.fields.find((f) => f.fieldName === fieldName);

      if (fieldConfig) {
        const validationResult = fieldValidator.validateFormField(
          fieldConfig,
          fieldValue
        );

        console.log(validationResult);

        if (!validationResult.hasPassed) {
          failedCheckCount += 1;
        }
      }
    }

    return failedCheckCount === 0;
  }

  return {
    validate
  };
}

export default FormValidator;
