import { useFormContext } from ".";

const FormSubmit = (props) => {
  const { children } = props;
  const { handleClickSubmit } = useFormContext();
  return <button onClick={handleClickSubmit}>{children ?? "Submit"}</button>;
};
export default FormSubmit;
