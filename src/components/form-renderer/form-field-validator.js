// @ts-nocheck
import { MandatoryValidationRule } from './validation-rules';
import ValidationTypes from './validation-types';

export const FormFieldValidator = function () {
  const performMandatoryCheck = (val) => {
    const rule = new MandatoryValidationRule();

    return rule.validate(val);
  };

  const validateFormField = (formFieldConfig, val) => {
    const requiresMandatoryCheck =
      formFieldConfig.validationRules?.mandatory?.enabled === true;

    const mandatoryValidationResult = requiresMandatoryCheck
      ? performMandatoryCheck(val)
      : true;

    const mandatoryValidationResponse = {
      validationType: ValidationTypes.MANDATORY,
      required: requiresMandatoryCheck === true,
      hasPassed: mandatoryValidationResult,
      errorMessage: !mandatoryValidationResult
        ? formFieldConfig.validationRules.mandatory.errorMessage
        : null
    };

    return [mandatoryValidationResponse];
  };

  return {
    validateFormField
  };
};
