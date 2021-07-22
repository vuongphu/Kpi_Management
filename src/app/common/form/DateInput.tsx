import React from "react";
import { FieldRenderProps } from "react-final-form";
import { Form, FormFieldProps, Label } from "semantic-ui-react";
import {DateTimePicker} from 'react-widgets'
interface IProps
  extends FieldRenderProps<Date, HTMLElement>,
    FormFieldProps {}

const DateInput: React.FC<IProps> = ({
  input,
  width,
  type,
  placeholder,
  date=false,
  time=false,
  selected,
  meta: { touched, error },
  ...rest
  
}) => {
 
  const {id, ...inline} = rest;
  return (
    <Form.Field error={touched && !!error} type={type} width={width}>
      <DateTimePicker placeholder={placeholder}
      onBlur ={input.onBlur}
      value={ input.value||null}
      onChange={input.onChange} 
      format={ time?'HH:mm':undefined}
      timeFormat={time?'HH:mm':undefined}
      step={15}
      // currentDate={ input.value||null }
      // defaultCurrentDate ={ input.value||null}
      // defaultValue={ !input.value && time ? new Date("2022-05-18T09:00:00.000Z") : input.value||null}
      // defaultValue ={time? new Date("2022-05-18T09:00:00.000Z") :undefined}
      onKeyDown ={(e)=>e.preventDefault()}
       {...inline}
       date={date}
       time={time}
       onFocus={()=>{
         console.log(input.value)
       }}
 
     />
      {touched && error &&(
          <Label basic color='red'>
              {error}
          </Label>
      )}
    </Form.Field>
  );
};
export default DateInput