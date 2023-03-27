import { Stack, Button, ModalBody, ModalFooter } from "@chakra-ui/react";
import { InputControl } from "formik-chakra-ui";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useUpdateUserMutation } from "../redux/api/userApi";

const UpdatePasswordForm = ({ data, onClose }) => {
  const [updateUser, updateResponse] = useUpdateUserMutation();

  let initialValues = {
    password: data?.password,
    password_repeat: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string().required("Required"),
    password_repeat: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

  const onSubmit = async (values) => {
    try {
      await updateUser({
        userId: data?.id,
        body: {
          password: values.password,
        },
      });
    } catch (err) {
      alert(err.data.message);
    } finally {
      onClose();
    }
  };

  return (
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
                  name="password"
                  label="New Password"
                  inputProps={{ type: "password" }}
                />

                <InputControl
                  isRequired
                  name="password_repeat"
                  label="Repeat Password"
                  inputProps={{ type: "password" }}
                />
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button
                type="submit"
                disabled={!formik.isValid}
                variant="primary"
                isLoading={updateResponse.isLoading}
              >
                Change
              </Button>
            </ModalFooter>
          </Form>
        );
      }}
    </Formik>
  );
};

export default UpdatePasswordForm;
