import { useState } from "react";
import { Link as ReachLink } from "react-router-dom";
import {
  Button,
  IconButton,
  ButtonGroup,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Tooltip,
  Center,
} from "@chakra-ui/react";
import { MdArchive, MdUnarchive, MdLock, MdLockOpen } from "react-icons/md";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  createColumnHelper,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useSelector } from "react-redux";

import {
  useDeleteEventMutation,
  useUpdateEventMutation,
} from "../redux/api/eventApi";
import EventForm from "./EventForm";
import { selectCurrentUser } from "../redux/features/auth/authSlice";
import ConfirmButton from "./ConfirmButton";
import { date } from "yup";
import {
  VStackDateTime,
  AttachmentsList,
  CustomDateTimeFormat,
} from "../utils/Formatter";
import Table from "./Table";

const EventTable = ({ data }) => {
  const [sorting, setSorting] = useState([]);
  const columnHelper = createColumnHelper();
  const currentUser = useSelector(selectCurrentUser);

  let columns;
  if (currentUser.isAdmin) {
    columns = [
      columnHelper.accessor("title", {
        cell: (info) => (
          <Button
            size="sm"
            variant="primary"
            as={ReachLink}
            to={`${info.cell.row.original.id}`}
          >
            {info.getValue()}
          </Button>
        ),
        header: "Title",
      }),
      columnHelper.accessor("start_date", {
        cell: (info) => (
          <Center>
            <CustomDateTimeFormat timeStamp={info.getValue()} type="date" />
          </Center>
        ),
        header: "Start Date",
      }),
      columnHelper.accessor("end_date", {
        cell: (info) => (
          <Center>
            <CustomDateTimeFormat timeStamp={info.getValue()} type="date" />
          </Center>
        ),
        header: "End Date",
      }),
      columnHelper.accessor("start_time", {
        cell: (info) => (
          <Center>
            <CustomDateTimeFormat
              timeStamp={`${info.cell.row.original.start_date}T${info.cell.row.original.start_time}`}
              type="time"
            />
          </Center>
        ),
        header: "Start Time",
      }),
      columnHelper.accessor("end_time", {
        cell: (info) => (
          <Center>
            <CustomDateTimeFormat
              timeStamp={`${info.cell.row.original.end_date}T${info.cell.row.original.end_time}`}
              type="time"
            />
          </Center>
        ),
        header: "End Time",
      }),
      columnHelper.accessor("attachments", {
        cell: (info) => <AttachmentsList filesArray={info.getValue()} />,
        header: "Attachments",
      }),
      columnHelper.accessor("created_at", {
        cell: (info) => <VStackDateTime timestamp={info.getValue()} />,
        header: "Created Time",
      }),
      columnHelper.accessor("", {
        cell: (info) => <ActionButtonGroup cell={info.cell} />,
        header: "Actions",
      }),
    ];
  } else {
    columns = [
      columnHelper.accessor("title", {
        cell: (info) => (
          <Button
            size="sm"
            variant="primary"
            as={ReachLink}
            to={`${info.cell.row.original.id}`}
          >
            {info.getValue()}
          </Button>
        ),
        header: "Title",
      }),
      columnHelper.accessor("start_date", {
        cell: (info) => (
          <CustomDateTimeFormat timeStamp={info.getValue()} type="date" />
        ),
        header: "Start Date",
      }),
      columnHelper.accessor("end_date", {
        cell: (info) => (
          <CustomDateTimeFormat timeStamp={info.getValue()} type="date" />
        ),
        header: "End Date",
      }),
    ];
  }

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
    },
    initialState: {
      pagination: { pageSize: 15 },
    },
  });

  const ActionButtonGroup = ({ cell }) => {
    const [deleteEvent, deleleteResponse] = useDeleteEventMutation();
    const [updateLockEvent, updateLockResponse] = useUpdateEventMutation();
    const [updateArchiveEvent, updateArchiveResponse] =
      useUpdateEventMutation();
    const {
      isOpen: isOpenEdit,
      onOpen: onOpenEdit,
      onClose: onCloseEdit,
    } = useDisclosure();
    const onSwitch = async (id, item, updateAction) => {
      try {
        await updateAction({
          eventId: id,
          body: {
            toggle: item,
          },
        });
      } catch (err) {
        alert(err.data.message);
      }
    };

    const originalRowData = cell.row.original;
    const closeRegistration = originalRowData.is_closed;
    const isArchived = originalRowData.is_archived;

    return (
      <Center>
        <ButtonGroup variant="outline" spacing="1">
          <Tooltip label="Edit">
            <IconButton
              variant="primaryOutline"
              icon={<FaEdit />}
              onClick={onOpenEdit}
            />
          </Tooltip>

          <Tooltip label={isArchived ? "Unarchive" : "Archive"}>
            <IconButton
              variant="primaryOutline"
              icon={
                isArchived ? <MdUnarchive size={22} /> : <MdArchive size={22} />
              }
              onClick={() =>
                onSwitch(originalRowData.id, "is_archived", updateArchiveEvent)
              }
              isLoading={updateArchiveResponse.isLoading}
            />
          </Tooltip>

          <Tooltip
            label={
              closeRegistration ? "Open Registration" : "Close Registration"
            }
          >
            <IconButton
              variant="primaryOutline"
              icon={
                closeRegistration ? (
                  <MdLockOpen size={22} />
                ) : (
                  <MdLock size={22} />
                )
              }
              onClick={() =>
                onSwitch(originalRowData.id, "is_closed", updateLockEvent)
              }
              isLoading={updateLockResponse.isLoading}
            />
          </Tooltip>

          <ConfirmButton
            headerText="Delete Event"
            bodyText="Are you sure you want to delete event?"
            onSuccessAction={() => {
              deleteEvent(originalRowData.id);
            }}
            buttonText="Delete"
            buttonIcon={<FaTrashAlt />}
            isDanger={true}
            isLoading={deleleteResponse.isLoading}
          />
        </ButtonGroup>

        <Modal isOpen={isOpenEdit} onClose={onCloseEdit}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Event</ModalHeader>
            <ModalCloseButton />
            <EventForm data={originalRowData} onClose={onCloseEdit} />
          </ModalContent>
        </Modal>
      </Center>
    );
  };

  return <Table table={table} />;
};

export default EventTable;
