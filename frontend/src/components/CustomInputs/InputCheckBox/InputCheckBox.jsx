import { useController } from "react-hook-form";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function InputCheckBox({
  name,
  control,
  rules,
  className,
  label = "",
  placeholder = "",
  type = "text",
}) {
  const {
    field: { onChange, value },
    fieldState: { invalid, isTouched, error },
  } = useController({
    name,
    control,
    rules: { ...rules },
    defaultValue: "",
  });

  return (
    <>
      <div className="flex flex-col">
        <FormControlLabel
          control={
            <Checkbox
              checked={value || false}
              onChange={(event) => onChange(event.target.checked)}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
          label={label}
        />
        {error && error.message && (
          <div className="text-red-600 text-sm mt-1">{error.message}</div>
        )}
      </div>
    </>
  );
}
