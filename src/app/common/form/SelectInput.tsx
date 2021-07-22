import React from "react";
import { FieldRenderProps } from "react-final-form";
import { Form, FormFieldProps, Label, Select } from "semantic-ui-react";
interface IProps
  extends FieldRenderProps<string, HTMLElement>,
    FormFieldProps {}

const SelectInput: React.FC<IProps> = ({
  input,
  width,
  options,
  placeholder,
  defaultValue,
  initialValues,

  meta: { touched, error },
}) => {
  console.log(options+"1234")
  return (
    <Form.Field error={touched && !!error}  width={width}>
      <Select 
      value={input.value}
      options={options}
      placeholder = {placeholder}
      onChange={(e,date)=>input.onChange(date.value)}

      />

      {touched && error &&(
          <Label basic color='red'>
              {error}
          </Label>
      )}
    </Form.Field>
  );
};
export default SelectInput