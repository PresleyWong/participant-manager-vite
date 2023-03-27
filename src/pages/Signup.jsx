import { useDispatch } from "react-redux";
import { useLocation, useNavigate, Link as ReachLink } from "react-router-dom";
import { setCredentials } from "../redux/features/auth/authSlice";
import { Box, Stack, useColorModeValue, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { InputControl } from "formik-chakra-ui";

import { useLoginMutation } from "../redux/api/authApi";
import { useCreateNewUserMutation } from "../redux/api/userApi";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation();
  const [createUser, createResponse] = useCreateNewUserMutation();
  const { state } = useLocation();
  const backgroundColor = useColorModeValue("white", "gray.700");
  const initialValues = {
    email: "",
    password: "",
    locality: "",
    name: "",
    isAdmin: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
    locality: Yup.string().required("Required"),
    name: Yup.string().required("Required"),
  });

  const onSubmit = async (values) => {
    try {
      await createUser({
        body: {
          email: values.email,
          password: values.password,
          locality: values.locality,
          name: values.name,
        },
      });
    } catch (err) {
      alert(err.data.message);
    } finally {
      const user = await login({
        email: values.email,
        password: values.password,
      }).unwrap();
      dispatch(setCredentials(user));
      navigate("/events");
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
          <Box rounded={"lg"} bg={backgroundColor} boxShadow={"lg"} p={8}>
            <Stack spacing={4}>
              <Form>
                <InputControl
                  name="email"
                  label="Email"
                  inputProps={{ type: "email" }}
                />

                <InputControl
                  name="password"
                  label="Password"
                  inputProps={{ type: "password" }}
                />
                <InputControl name="locality" label="Locality" />
                <InputControl name="name" label="Name" />

                <Stack spacing={10}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  ></Stack>
                  <Button
                    type="submit"
                    disabled={!formik.isValid}
                    className="primary-button"
                    isLoading={createResponse.isLoading}
                  >
                    Submit
                  </Button>
                </Stack>
              </Form>
            </Stack>
          </Box>
        );
      }}
    </Formik>
  );
};

export default Signup;
