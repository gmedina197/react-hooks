import { useState } from 'react';

export const useForm = (formInitialState, callback) => {
  const [inputs, setInputs] = useState(formInitialState);

  const handleSubmit = event => {
    if (event) {
      event.preventDefault();
    }

    callback();
  };

  const handleInputChange = event => {
    event.persist();

    setInputs(inputs => ({
      ...inputs,
      [event.target.name]:
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value
    }));
  };

  return {
    handleSubmit,
    handleInputChange,
    inputs
  };
};
