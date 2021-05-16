function FormValidator() {
  function validate(formConfig, formValues) {
    for (const [fieldName, fieldValue] of Object.entries(formValues)) {
      console.log(`${fieldName}: ${fieldValue}`);
    }
  }

  return {
    validate
  };
}

export default FormValidator;
