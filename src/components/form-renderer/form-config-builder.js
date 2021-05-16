function FormConfigBuilder() {
  this.formConfig = {};

  function createForm(id, formName) {
    this.formConfig = {
      id,
      formName,
      fields: []
    };

    return this;
  }

  function addField(field) {
    if (typeof field !== 'object') {
      return this;
    }

    this.formConfig.fields.push(field);

    return this;
  }

  function build() {
    return this.formConfig;
  }

  return {
    createForm,
    addField,
    build
  };
}

export default FormConfigBuilder;
