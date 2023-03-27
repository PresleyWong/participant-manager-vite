import {
  Stack,
  Button,
  ModalBody,
  ModalFooter,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { InputControl } from "formik-chakra-ui";
import { useState } from "react";

import DeleteAttachment from "./DeleteAttachment";
import {
  useUpdateEventMutation,
  useCreateNewEventMutation,
} from "../redux/api/eventApi";
import { UploadFileButton } from "../themeConfig";

const EventForm = ({ data, onClose, createNew = false }) => {
  const [updateEvent, updateResponse] = useUpdateEventMutation();
  const [createEvent, createResponse] = useCreateNewEventMutation();
  const [uploadedFiles, setUploadedFiles] = useState(null);
  const handleFileChange = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    setUploadedFiles(chosenFiles);
  };

  let response = createResponse;
  let formAction = createEvent;
  let buttonText = "Create";

  let initialValues = {
    title: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
  };

  if (!createNew) {
    response = updateResponse;
    formAction = updateEvent;
    buttonText = "Save";
    initialValues = {
      title: data?.title,
      startDate: data?.start_date,
      endDate: data?.end_date,
      startTime: data?.start_time,
      endTime: data?.end_time,
    };
  }

  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
    startDate: Yup.date().required("Required"),
    endDate: Yup.date().required("Required"),
    startTime: Yup.string().required("Required"),
    endTime: Yup.string().required("Required"),
  });

  const onSubmit = async (values) => {
    try {
      let formData = new FormData();

      if (uploadedFiles) {
        uploadedFiles.forEach((file, i) => {
          formData.append(`attachments[]`, file);
        });
      }

      formData.append("title", values.title);
      formData.append("start_date", values.startDate);
      formData.append("end_date", values.endDate);
      formData.append("start_time", values.startTime);
      formData.append("end_time", values.endTime);

      await formAction({
        eventId: data?.id,
        body: formData,
      });
    } catch (err) {
      alert(err.data.message);
    } finally {
      onClose();
    }
  };

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
                <InputControl isRequired label="Title" name="title" />
                <InputControl
                  isRequired
                  label="Start Date"
                  name="startDate"
                  inputProps={{ type: "date" }}
                />
                <InputControl
                  isRequired
                  label="End Date"
                  name="endDate"
                  inputProps={{ type: "date" }}
                />
                <InputControl
                  isRequired
                  label="Start Time"
                  name="startTime"
                  inputProps={{ type: "time" }}
                />
                <InputControl
                  isRequired
                  label="End Time"
                  name="endTime"
                  inputProps={{ type: "time" }}
                />

                <label>Attachments</label>
                <VStack>
                  {data?.attachments.map((file, index) => (
                    <HStack justify="space-between" key={index}>
                      <Text>
                        {file.url.split("/").pop().replace(/%20/g, " ")}
                      </Text>

                      <DeleteAttachment id={data?.id} index={index} />
                    </HStack>
                  ))}
                </VStack>

                <UploadFileButton onChange={handleFileChange} />
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button
                type="submit"
                disabled={!formik.isValid}
                isLoading={response.isLoading}
                variant="primary"
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

export default EventForm;
