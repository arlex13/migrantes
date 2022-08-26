import { TextField } from "@mui/material";
import { InputTextArea } from "../CustomInputs";
import { Validations } from "./InputValidations";

const InputTextAreaField = ({
  title,
  type = "text",
  control,
  name,
  validations = [],
}) => {
  const rules = Validations(validations);
  return (
    <div>
      <label htmlFor="" className="label">
        {title}
      </label>
      <InputTextArea
        type={type}
        control={control}
        name={name}
        rules={rules}
        placeholder={`Ingrese: ${title.toLowerCase()}`}
      />
    </div>
  );
};
export default InputTextAreaField;
