function FormRenderer() {
  const helloWorld = () => alert('hello');

  return {
    init: helloWorld
  };
}

export default FormRenderer;
