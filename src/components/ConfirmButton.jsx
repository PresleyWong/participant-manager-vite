import { Box } from "@chakra-ui/layout";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";

const ConfirmButton = ({
  onSuccessAction,
  buttonText,
  buttonIcon,
  headerText,
  bodyText,
  isDanger,
  isLoading,
  isDisabled = false,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSubmit = () => {
    onSuccessAction();
    onClose();
  };

  let customButton;

  if (buttonIcon)
    customButton = (
      <IconButton
        variant={isDanger ? "errorOutline" : "primaryOutline"}
        icon={buttonIcon}
        onClick={onOpen}
        isLoading={isLoading}
        isDisabled={isDisabled}
      />
    );
  else
    customButton = (
      <Button
        onClick={onOpen}
        colorScheme={isDanger ? "red" : "teal"}
        isDisabled={isDisabled}
      >
        {buttonText}
      </Button>
    );

  return (
    <>
      <Tooltip label={buttonText}>{customButton}</Tooltip>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{headerText}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>{bodyText}</Box>
          </ModalBody>

          <ModalFooter>
            <Button variant="primary" onClick={onClose} mr={3}>
              Close
            </Button>
            <Button
              variant={isDanger ? "errorOutline" : "primary"}
              onClick={onSubmit}
            >
              {buttonText}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ConfirmButton;
