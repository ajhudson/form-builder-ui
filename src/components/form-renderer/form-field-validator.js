// @ts-nocheck
import { MandatoryValidationRule } from './validation-rules';

export const FormFieldValidator = function () {
  const performMandatoryCheck = (val) => {
    const rule = new MandatoryValidationRule();

    return rule.validate(val);
  };

  const validateFormField = (formFieldConfig, val) => {
    const requiresMandatoryCheck =
      formFieldConfig.validationRules?.mandatory?.enabled;
    const mandatoryValidationResult = requiresMandatoryCheck
      ? performMandatoryCheck(val)
      : true;

    return {
      mandatoryCheckResult: {
        required: requiresMandatoryCheck === true,
        hasPassed: mandatoryValidationResult,
        errorMessage: !mandatoryValidationResult
          ? formFieldConfig.validationRules.mandatory.errorMessage
          : null
      }
    };
  };

  return {
    validateFormField
  };
};
