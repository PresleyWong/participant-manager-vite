import { MdClose } from "react-icons/md";

import ConfirmButton from "./ConfirmButton";
import { useDeleteEventAttachmentsMutation } from "../redux/api/eventApi";

const DeleteAttachment = ({ id, index }) => {
  const [deleteEventAttachments, deleteAttachmentsResponse] =
    useDeleteEventAttachmentsMutation();

  const content = (
    <ConfirmButton
      headerText="Delete Attachment"
      bodyText="Are you sure you want to delete?"
      onSuccessAction={() => {
        deleteEventAttachments({
          eventId: id,
          fileIndex: index,
        });
      }}
      buttonText="Delete"
      buttonIcon={<MdClose />}
      isDanger={true}
      isLoading={deleteAttachmentsResponse.isLoading}
    />
  );

  return content;
};

export default DeleteAttachment;
