export const MandatoryValidationRule = function () {
  function validate(val) {
    if (typeof val !== 'string') {
      return false;
    }

    return val.trim().match(/^.+$/gi);
  }

  return {
    validate
  };
};
