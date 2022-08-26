import { TextField } from "@mui/material";
import {
  InputSelectField,
  InputTextField,
  InputDateField,
} from "../../components/Input";
import { InputTextArea } from "../CustomInputs";

const InputMasterField = ({
  name,
  title,
  control,
  validations = ["required"],
  type = "text",
  options = [],
  component = false,
}) => {
  if (component) {
    return component;
  } else if (type === "title") {
    return <h3 className="w-full mt-8 mb-2">{title}</h3>;
  } else if (options && options.length > 0) {
    return (
      <div className="w-full sm:w-1/2 px-2 sm:px-6 py-1 ">
        <InputSelectField
          name={name}
          title={title}
          control={control}
          validations={validations}
          options={options}
        />
      </div>
    );
  } else if (["text", "email", "password"].includes(type)) {
    if (type === "email") {
      validations = ["required", "email"];
      type = "text";
    }
    return (
      <div className="w-full sm:w-1/2 px-2 sm:px-6 py-1 ">
        <InputTextField
          name={name}
          title={title}
          control={control}
          type={type}
          validations={validations}
        />
      </div>
    );
  } else if (type === "date") {
    return (
      <div className="w-full sm:w-1/2 px-2 sm:px-6 py-1 ">
        <InputDateField name={name} title={title} control={control} />
      </div>
    );
  } else if (type === "textArea") {
    return (
      <div className="w-full sm:w-1/2 px-2 sm:px-6 py-1 ">
        <InputTextArea
          name={name}
          title={title}
          control={control}
          validations={validations}
        />
      </div>
    );
  }

  return (
    <label htmlFor="" className="label">
      -Tipo no definido-
    </label>
  );
};
export default InputMasterField;
