import { TextField } from "@mui/material";
import { InputDate } from "../../components/CustomInputs";
import { Validations } from "./InputValidations";

const InputDateField = ({ title, control, name }) => {
  const rules = Validations(["required", "date"]);
  return (
    <div>
      <label htmlFor="" className="label">
        {title}
      </label>
      <InputDate control={control} name={name} rules={rules} />
    </div>
  );
};
export default InputDateField;
