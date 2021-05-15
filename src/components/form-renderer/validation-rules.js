export const MandatoryValidationRule = function () {
  function validate(val) {
    if (typeof val !== 'string') {
      return false;
    }

    const patt = /^.+$/gi;

    return patt.test(val.trim());
  }

  return {
    validate
  };
};
