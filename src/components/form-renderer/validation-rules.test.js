// @ts-nocheck
import { MandatoryValidationRule } from './validation-rules';

describe('Tests for mandatory validation rules', () => {
  let validator;

  beforeEach(() => {
    validator = new MandatoryValidationRule();
  });

  it('should return true if the content is not empty', () => {
    expect(validator.validate('wibble')).toBeTruthy();
  });

  it('should return if the content is an empty string', () => {
    expect(validator.validate('')).toBeFalsy();
  });

  it('should return false is a non-string value is tested', () => {
    expect(validator.validate(null)).toBeFalsy();
  });

  it('should return false if the string is just whitepace', () => {
    expect(validator.validate('   ')).toBeFalsy();
  });
});
