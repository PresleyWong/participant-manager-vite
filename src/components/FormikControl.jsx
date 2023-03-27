import { Field } from "formik";
// import DateView from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import {
  Input as ChakraInput,
  FormControl as ChakraFormControl,
  Select as ChakraSelect,
  Textarea as ChakraTextArea,
  Checkbox as ChakraCheckbox,
  CheckboxGroup as ChakraCheckboxGroup,
  Radio as ChakraRadio,
  RadioGroup as ChakraRadioGroup,
  FormLabel,
  FormErrorMessage,
  Stack,
} from "@chakra-ui/react";

const Input = ({ label, name, ...rest }) => {
  return (
    <Field name={name}>
      {({ field, form }) => (
        <ChakraFormControl isInvalid={form.errors[name] && form.touched[name]}>
          <FormLabel>{label}</FormLabel>
          <ChakraInput id={name} {...rest} {...field} />
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </ChakraFormControl>
      )}
    </Field>
  );
};

const Select = ({ label, name, options, ...rest }) => {
  return (
    <Field name={name}>
      {({ field, form }) => (
        <ChakraFormControl isInvalid={form.errors[name] && form.touched[name]}>
          <FormLabel>{label}</FormLabel>
          <ChakraSelect
            placeholder="Select option"
            id={name}
            {...rest}
            {...field}
          >
            {options.map((option, index) => {
              return (
                <option key={index} value={option}>
                  {option}
                </option>
              );
            })}
          </ChakraSelect>
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </ChakraFormControl>
      )}
    </Field>
  );
};

const Textarea = ({ label, name, ...rest }) => {
  return (
    <Field name={name}>
      {({ field, form }) => (
        <ChakraFormControl isInvalid={form.errors[name] && form.touched[name]}>
          <FormLabel>{label}</FormLabel>
          <ChakraTextArea
            size="sm"
            id={name}
            {...rest}
            {...field}
          ></ChakraTextArea>
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </ChakraFormControl>
      )}
    </Field>
  );
};

const RadioButtons = ({ label, name, options, ...rest }) => {
  return (
    <Field name={name}>
      {({ field, form }) => (
        <ChakraFormControl isInvalid={form.errors[name] && form.touched[name]}>
          <FormLabel>{label}</FormLabel>
          <ChakraRadioGroup id={name} {...rest} {...field}>
            <Stack spacing={5} direction="row">
              {options.map((option, index) => {
                return (
                  <ChakraRadio key={index} value={option}>
                    {option}
                  </ChakraRadio>
                );
              })}
            </Stack>
          </ChakraRadioGroup>
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </ChakraFormControl>
      )}
    </Field>
  );
};

const CheckboxGroup = ({ label, name, options, ...rest }) => {
  return (
    <Field name={name}>
      {({ field, form }) => (
        <ChakraFormControl isInvalid={form.errors[name] && form.touched[name]}>
          <FormLabel>{label}</FormLabel>
          <ChakraCheckboxGroup id={name} {...rest} {...field}>
            <Stack spacing={5} direction="row">
              {options.map((option, index) => {
                return (
                  <ChakraCheckbox key={index} defaultChecked={field.value}>
                    {option}
                  </ChakraCheckbox>
                );
              })}
            </Stack>
          </ChakraCheckboxGroup>
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </ChakraFormControl>
      )}
    </Field>
  );
};

const FormikControl = (props) => {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "select":
      return <Select {...rest} />;
    case "textarea":
      return <Textarea {...rest} />;
    case "radio":
      return <RadioButtons {...rest} />;
    case "checkbox":
      return <CheckboxGroup {...rest} />;
    default:
      return null;
  }
};

export default FormikControl;
