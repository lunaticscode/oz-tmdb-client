import { useFormContext } from ".";

const FormErrorMessage = (props) => {
  const { name, children } = props;
  const { validStatus } = useFormContext();
  return name in validStatus && validStatus[name] === false ? (
    <div>{children}</div>
  ) : null;
};
export default FormErrorMessage;
