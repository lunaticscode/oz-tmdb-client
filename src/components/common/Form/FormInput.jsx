import { useId, useState } from "react";
import { useFormContext } from ".";

const FormInput = (props) => {
  const { label = "", type, name, placeholder, onValid } = props;

  const formInputId = useId();
  const { formInputs, handleChangeFormInput, handleValidStatus } =
    useFormContext();
  const handleChange = ({ target: { value } }) => {
    // 유효성검사도 같이 진행
    const isValid = onValid(value);
    // 상위 Form Context 접근해서 현재 유효하지 않은 input을 알려줌
    handleValidStatus(name, isValid);
    handleChangeFormInput(name, value);
  };

  return (
    <div>
      {label && <label htmlFor={formInputId}>{label}</label>}
      <input
        name={name}
        type={type}
        onChange={handleChange}
        value={formInputs[name] ?? ""}
        id={formInputId}
        placeholder={placeholder}
      />
    </div>
  );
};
export default FormInput;

// const [name, setName] = useState("");
// <FormInput onValid={() => name.length < 10} />;
