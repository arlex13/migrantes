import { TextField } from "@mui/material";
import { InputSelect } from "../../components/CustomInputs";
import { Validations } from "./InputValidations";

const InputSelectField = ({ title, control, name, validations, options }) => {
  const rules = Validations(validations);
  return (
    <div>
      <label htmlFor="test" className="label">
        {title}
      </label>
      <div className="control">
        <InputSelect
          control={control}
          name={name}
          rules={rules}
          placeholder={`Seleccione: ${title.toLowerCase()}`}
          options={options}
        />
      </div>
    </div>
  );
};
export default InputSelectField;
