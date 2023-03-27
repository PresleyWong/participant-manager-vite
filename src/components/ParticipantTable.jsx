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
  Center,
  Text,
} from "@chakra-ui/react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  createColumnHelper,
  getPaginationRowModel,
} from "@tanstack/react-table";

import { useDeleteParticipantMutation } from "../redux/api/participantApi";
import ParticipantForm from "./ParticipantForm";
import ConfirmButton from "./ConfirmButton";
import Table from "./Table";
import { GenderColoredName } from "../utils/Formatter";

const ParticipantTable = ({ data }) => {
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
    columnHelper.accessor("locality", {
      cell: (info) => <Text align="center">{info.getValue()}</Text>,
      header: "Locality",
    }),
    columnHelper.accessor("college", {
      cell: (info) => <Text align="center">{info.getValue()}</Text>,
      header: "College",
    }),
    columnHelper.accessor("academic_year", {
      cell: (info) => <Text align="center">{info.getValue()}</Text>,
      header: "Academic Year",
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
    const [deleteParticipant, deleteResponse] = useDeleteParticipantMutation();
    const originalRowData = cell.row.original;

    return (
      <Center>
        <ButtonGroup variant="outline" spacing="1">
          <Tooltip label="Edit">
            <IconButton
              variant="primaryOutline"
              icon={<FaEdit />}
              onClick={onOpen}
            />
          </Tooltip>

          <ConfirmButton
            headerText="Confirm?"
            bodyText="Are you sure you want to delete?"
            onSuccessAction={() => {
              deleteParticipant(originalRowData.id);
            }}
            buttonText="Delete"
            buttonIcon={<FaTrashAlt />}
            isDanger={true}
            isLoading={deleteResponse.isLoading}
          />
        </ButtonGroup>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Participant's Details</ModalHeader>
            <ModalCloseButton />
            <ParticipantForm data={originalRowData} onClose={onClose} />
          </ModalContent>
        </Modal>
      </Center>
    );
  };

  return <Table table={table} />;
};

export default ParticipantTable;
