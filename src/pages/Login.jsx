import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Stack,
  Button,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { InputControl } from "formik-chakra-ui";

import { useLoginMutation } from "../redux/api/authApi";
import { setCredentials } from "../redux/features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation();
  const { state } = useLocation();
  const backgroundColor = useColorModeValue("neutral.100", "neutral.20");

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = async (values) => {
    try {
      const user = await login({
        email: values.email,
        password: values.password,
      }).unwrap();
      dispatch(setCredentials(user));
      if (state) navigate(state.from.pathname);
      else navigate("/events");
    } catch (err) {
      // alert(err.data.message);
      document.getElementById("error-message").innerHTML =
        "Incorrect email or password";
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
          <Box
            rounded={"lg"}
            bg={backgroundColor}
            boxShadow={"lg"}
            p={8}
            minW="376px"
          >
            <Stack spacing={4}>
              <Form>
                <Stack spacing={4}>
                  <Tooltip label="Hint: test1@gmail.com">
                    <InputControl
                      name="email"
                      label="Email"
                      inputProps={{ type: "email" }}
                      variant={"custom"}
                    />
                  </Tooltip>

                  <Tooltip label="Hint: 123456">
                    <InputControl
                      name="password"
                      label="Password"
                      inputProps={{ type: "password" }}
                    />
                  </Tooltip>

                  <Box id="error-message"></Box>

                  <Button
                    type="submit"
                    disabled={!formik.isValid}
                    isLoading={isLoading}
                    variant="primary"
                  >
                    Sign in
                  </Button>
                </Stack>
              </Form>

              {/* <Text fontWeight="medium">
                Don't have an account?
                <Link as={ReachLink} ms="5px" fontWeight="bold" to="/signup">
                  Sign Up
                </Link>
              </Text> */}
            </Stack>
          </Box>
        );
      }}
    </Formik>
  );
};

export default Login;
