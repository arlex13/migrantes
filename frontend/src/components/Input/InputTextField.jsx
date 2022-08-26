import { TextField } from "@mui/material";
import { InputText } from "../../components/CustomInputs";
import { Validations } from "./InputValidations";

const InputTextField = ({
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
      <InputText
        type={type}
        control={control}
        name={name}
        rules={rules}
        placeholder={`Ingrese: ${title.toLowerCase()}`}
      />
    </div>
  );
};
export default InputTextField;
