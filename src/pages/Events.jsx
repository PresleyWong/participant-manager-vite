import {
  Button,
  Stack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  Box,
  Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import EventForm from "../components/EventForm";
import { selectCurrentUser } from "../redux/features/auth/authSlice";
import SimpleEventList from "../components/SimpleEventList";
import { useGetAllEventsQuery } from "../redux/api/eventApi";
import EventTable from "../components/EventTable";
import ArchiveEventTable from "../components/ArchiveEventTable";
import Spinner from "../components/Spinner";

const Events = () => {
  const { data, isLoading, isSuccess, isError, error } = useGetAllEventsQuery();
  const {
    isOpen: isOpenNew,
    onOpen: onOpenNew,
    onClose: onCloseNew,
  } = useDisclosure();
  const currentUser = useSelector(selectCurrentUser);

  let content;

  if (isSuccess) {
    if (currentUser.isAdmin) {
      content = (
        <>
          <Modal isOpen={isOpenNew} onClose={onCloseNew}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>New Event</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <EventForm createNew={true} onClose={onCloseNew} />
              </ModalBody>
            </ModalContent>
          </Modal>
          <EventTable data={data} />
          <Stack
            direction="row"
            mt={"1rem"}
            justify={"flex-start"}
            width="100%"
          >
            {currentUser.isAdmin && (
              <Button size="sm" variant="primary" onClick={onOpenNew}>
                Create New Event
              </Button>
            )}
          </Stack>

          {currentUser.isAdmin && (
            <VStack width="100%" mt="10">
              <Box className="align-left">
                <Text as="b">Archive</Text>
              </Box>

              <ArchiveEventTable />
            </VStack>
          )}
        </>
      );
    } else {
      content = <SimpleEventList currentUser={currentUser} />;
    }
  } else if (isLoading) {
    content = <Spinner />;
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return content;
};

export default Events;
