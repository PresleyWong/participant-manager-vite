import {
  Stack,
  Button,
  ModalBody,
  ModalFooter,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  ModalHeader,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useUpdateParticipantAppointmentMutation } from "../redux/api/eventApi";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { SelectControl, TextareaControl } from "formik-chakra-ui";
import ParticipantForm from "./ParticipantForm";

const AppointmentForm = ({ data, onClose }) => {
  const [update, response] = useUpdateParticipantAppointmentMutation();

  let initialValues = {
    language: data?.language,
    remarks: data?.remarks,
  };

  const validationSchema = Yup.object({
    language: Yup.string().required("Required"),
  });

  const onSubmit = async (values) => {
    try {
      await update({
        appointmentId: data?.appointment_id,
        body: {
          language: values.language,
          remarks: values.remarks,
        },
      });
    } catch (err) {
      alert(err.data.message);
    } finally {
      onClose();
    }
  };

  const languageOptions = ["English", "Chinese", "Bahasa Malaysia"];

  const {
    isOpen: isOpenParticipant,
    onOpen: onOpenParticipant,
    onClose: onCloseParticipant,
  } = useDisclosure();

  const content = (
    <>
      <Modal isOpen={isOpenParticipant} onClose={onCloseParticipant}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Saint's Details</ModalHeader>
          <ModalCloseButton />
          <ParticipantForm data={data} onClose={onCloseParticipant} />
        </ModalContent>
      </Modal>

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
                  <SelectControl
                    isRequired
                    label="Language"
                    name="language"
                    selectProps={{ placeholder: "Select option" }}
                  >
                    {languageOptions.map((option, index) => {
                      return (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      );
                    })}
                  </SelectControl>
                  <TextareaControl label="Remarks" name="remarks" />
                </Stack>
              </ModalBody>
              <ModalFooter>
                <Button mr="4" onClick={onOpenParticipant} variant="secondary">
                  Edit Saint's Details
                </Button>

                <Button
                  type="submit"
                  disabled={!formik.isValid}
                  variant="primary"
                  isLoading={response.isLoading}
                >
                  Save
                </Button>
              </ModalFooter>
            </Form>
          );
        }}
      </Formik>
    </>
  );

  return content;
};

export default AppointmentForm;
