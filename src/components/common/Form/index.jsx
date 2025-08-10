import { createContext, useContext, useState } from "react";
import FormInput from "./FormInput";
import FormErrorMessage from "./FormErrorMessage";
import FormSubmit from "./FormSubmit";

const FormContext = createContext(null);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("Invalid context scope :: FormContext");
  }
  return context;
};

const Form = (props) => {
  const {
    children,
    defaultFormInputs,
    onChangeFormInputs,
    onSubmit,
    onSubmitError,
  } = props;
  const [validStatus, setValidStatus] = useState({});
  const [formInputs, setFormInputs] = useState(defaultFormInputs ?? {}); // ex. {email: "asdasd", password: "asdasd"}

  const handleChangeFormInput = (field, formValue) => {
    const updatedFormInputs = { ...formInputs, [field]: formValue };
    setFormInputs(updatedFormInputs);
    onChangeFormInputs(updatedFormInputs);
  };

  const handleValidStatus = (field, isValid) => {
    setValidStatus((prev) => ({ ...prev, [field]: isValid }));
  };

  const handleClickSubmit = () => {
    let isValidSubmit = true;
    if (Object.values(validStatus).some((v) => !v)) {
      isValidSubmit = false;
    }
    if (isValidSubmit) {
      onSubmit(formInputs);
    } else {
      const errorFields = [];
      for (const field in validStatus) {
        if (!validStatus[field]) {
          errorFields.push(field);
        }
      }
      onSubmitError(errorFields);
    }
  };

  const contextValue = {
    handleValidStatus,
    validStatus,
    formInputs,
    handleChangeFormInput,
    handleClickSubmit,
  };
  return (
    <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
  );
};

Form.Input = FormInput;
Form.ErrorMessage = FormErrorMessage;
Form.Submit = FormSubmit;

export default Form;
