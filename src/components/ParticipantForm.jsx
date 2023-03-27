import { Stack, Button, ModalBody, ModalFooter } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  InputControl,
  SelectControl,
  NumberInputControl,
} from "formik-chakra-ui";
import { useSelector } from "react-redux";

import { selectCurrentUser } from "../redux/features/auth/authSlice";
import {
  useUpdateParticipantMutation,
  useCreateNewParticipantMutation,
} from "../redux/api/participantApi";

const ParticipantForm = ({ data, onClose, createNew = false }) => {
  const [update, updateResponse] = useUpdateParticipantMutation();
  const [create, createResponse] = useCreateNewParticipantMutation();
  const currentUser = useSelector(selectCurrentUser);

  let response = createResponse;
  let formAction = create;
  let buttonText = "Create";

  let initialValues = {
    english_name: "",
    chinese_name: "",
    gender: "",
    email: "",
    phone: "",
    language: "",
    college: "",
    academic_year: "",
    remarks: "",
    locality: currentUser.isAdmin ? "" : currentUser.locality,
  };

  if (!createNew) {
    response = updateResponse;
    formAction = update;
    buttonText = "Save";
    initialValues = {
      english_name: data?.english_name,
      chinese_name: data?.chinese_name,
      gender: data?.gender,
      email: data?.email,
      phone: data?.phone,
      language: data?.language,
      college: data?.college,
      academic_year: data?.academic_year,
      remarks: data?.remarks,
      locality: data?.locality,
    };
  }

  const validationSchema = Yup.object({
    english_name: Yup.string().required("Required"),
    // chinese_name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    phone: Yup.number().required("Required"),
    locality: Yup.string().required("Required"),
    gender: Yup.string().required("Required"),
    // college: Yup.string().required("Required"),
    // academic_year: Yup.number().required("Required"),
  });

  const onSubmit = async (values) => {
    try {
      await formAction({
        participantId: data?.id,
        body: {
          english_name: values.english_name,
          chinese_name: values.chinese_name,
          gender: values.gender,
          locality: values.locality,
          email: values.email,
          phone: values.phone,
          college: values.college,
          academic_year: values.academic_year,
        },
      });
    } catch (err) {
      alert(err.data.message);
    } finally {
      onClose();
    }
  };

  const genderOptions = ["Brother", "Sister"];

  const content = (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form>
            <ModalBody pb={6}>
              <Stack spacing={4}>
                <InputControl
                  isRequired
                  label="English Name"
                  name="english_name"
                />
                <InputControl label="Chinese Name" name="chinese_name" />
                <SelectControl
                  isRequired
                  label="Gender"
                  name="gender"
                  selectProps={{ placeholder: "Select option" }}
                >
                  {genderOptions.map((option, index) => {
                    return (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    );
                  })}
                </SelectControl>
                <InputControl
                  isRequired
                  label="Email"
                  name="email"
                  inputProps={{ type: "email" }}
                />
                <InputControl
                  isRequired
                  label="Phone"
                  name="phone"
                  inputProps={{ type: "tel" }}
                />
                <InputControl
                  isRequired
                  label="Locality"
                  name="locality"
                  hidden={!currentUser.isAdmin}
                />
                <InputControl label="College" name="college" />
                <NumberInputControl
                  label="Academic Year"
                  name="academic_year"
                />
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button
                type="submit"
                disabled={!formik.isValid}
                variant="primary"
                isLoading={response.isLoading}
              >
                {buttonText}
              </Button>
            </ModalFooter>
          </Form>
        );
      }}
    </Formik>
  );

  return content;
};

export default ParticipantForm;
