import { useState } from "react";
import {
  IconButton,
  ButtonGroup,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Tooltip,
  Text,
  Center,
} from "@chakra-ui/react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  createColumnHelper,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useSelector } from "react-redux";

import { selectCurrentUser } from "../redux/features/auth/authSlice";
import { useRemoveParticipantFromEventMutation } from "../redux/api/eventApi";
import AppointmentForm from "./AppointmentForm";
import ConfirmButton from "./ConfirmButton";
import Table from "./Table";
import { GenderColoredName, VStackDateTime } from "../utils/Formatter";

const RegistrantTable = ({ data, eventClosed }) => {
  const currentUser = useSelector(selectCurrentUser);

  const columnHelper = createColumnHelper();
  const [sorting, setSorting] = useState([]);
  const columns = [
    columnHelper.accessor("gender", {
      cell: (info) => info.getValue(),
      header: "Gender",
    }),
    columnHelper.accessor("english_name", {
      cell: (info) => info.getValue(),
      header: "English Name",
    }),
    columnHelper.accessor("chinese_name", {
      cell: (info) => info.getValue(),
      header: "Chinese Name",
    }),
    columnHelper.accessor("name", {
      cell: (info) => (
        <span align="center">
          <GenderColoredName
            name={info.cell.row.original.name}
            gender={info.cell.row.original.gender}
          />
        </span>
      ),
      header: "Name",
    }),
    columnHelper.accessor("email", {
      cell: (info) => <Text align="center">{info.getValue()}</Text>,
      header: "Email",
    }),
    columnHelper.accessor("phone", {
      cell: (info) => <Text align="center">{info.getValue()}</Text>,
      header: "Phone",
    }),
    columnHelper.accessor("language", {
      cell: (info) => <Text align="center">{info.getValue()}</Text>,
      header: "Language",
    }),
    columnHelper.accessor("college", {
      cell: (info) => <Text align="center">{info.getValue()}</Text>,
      header: "College",
    }),
    columnHelper.accessor("academic_year", {
      cell: (info) => <Text align="center">{info.getValue()}</Text>,
      header: "Academic Year",
    }),
    columnHelper.accessor("server", {
      cell: (info) => <Text align="center">{info.getValue()}</Text>,
      header: "Registered By",
    }),
    columnHelper.accessor("remarks", {
      cell: (info) => <Text align="center">{info.getValue()}</Text>,
      header: "Remarks",
    }),
    columnHelper.accessor("register_time", {
      cell: (info) => <VStackDateTime timestamp={info.getValue()} />,
      header: "Registered Time",
    }),
    columnHelper.accessor("", {
      cell: (info) => <ActionButtonGroup cell={info.cell} />,
      header: "Actions",
    }),
  ];

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
      columnVisibility: {
        gender: false,
        english_name: false,
        chinese_name: false,
      },
      pagination: { pageSize: 15 },
    },
  });

  const ActionButtonGroup = ({ cell }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [removeParticipant, removeResponse] =
      useRemoveParticipantFromEventMutation();
    const originalRowData = cell.row.original;

    return (
      <Center>
        <ButtonGroup variant="outline" spacing="1">
          <Tooltip label="Edit Registration Info">
            <IconButton
              variant="primaryOutline"
              icon={<FaEdit />}
              onClick={onOpen}
              isDisabled={eventClosed && !currentUser.isAdmin}
            />
          </Tooltip>

          <ConfirmButton
            headerText="Remove Participant"
            bodyText="Are you sure you want to remove participant?"
            onSuccessAction={() => {
              removeParticipant({
                appointmentId: originalRowData.appointment_id,
              });
            }}
            buttonText="Remove"
            buttonIcon={<FaTrashAlt />}
            isDanger={true}
            isLoading={removeResponse.isLoading}
            isDisabled={eventClosed && !currentUser.isAdmin}
          />
        </ButtonGroup>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Registration Info</ModalHeader>
            <ModalCloseButton />
            <AppointmentForm data={originalRowData} onClose={onClose} />
          </ModalContent>
        </Modal>
      </Center>
    );
  };

  return <Table table={table} />;
};

export default RegistrantTable;
