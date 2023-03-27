import { useState } from "react";
import {
  Icon,
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
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  createColumnHelper,
} from "@tanstack/react-table";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { HiCheck } from "react-icons/hi";

import { useDeleteUserMutation } from "../redux/api/userApi";
import UserForm from "./UserForm";
import ConfirmButton from "./ConfirmButton";
import { VStackDateTime } from "../utils/Formatter";
import Table from "./Table";

const UserTable = ({ data }) => {
  const [sorting, setSorting] = useState([]);
  const columnHelper = createColumnHelper();

  let columns = [
    columnHelper.accessor("email", {
      cell: (info) => <Center>{info.getValue()}</Center>,
      header: "Email",
    }),
    columnHelper.accessor("locality", {
      cell: (info) => <Center>{info.getValue()}</Center>,
      header: "Locality",
    }),
    columnHelper.accessor("name", {
      cell: (info) => <Center>{info.getValue()}</Center>,
      header: "Name",
    }),
    columnHelper.accessor("is_admin", {
      cell: (info) => (
        <Center>
          <Icon
            boxSize={5}
            as={info.cell.row.original.is_admin ? HiCheck : IoMdClose}
          />
        </Center>
      ),

      header: "Is Admin?",
    }),
    columnHelper.accessor("created_at", {
      cell: (info) => <VStackDateTime timestamp={info.getValue()} />,
      header: "Created Time",
    }),
    columnHelper.accessor("updated_at", {
      cell: (info) => <VStackDateTime timestamp={info.getValue()} />,
      header: "Last Update",
    }),
    columnHelper.accessor("actions", {
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
      pagination: { pageSize: 15 },
    },
  });

  const ActionButtonGroup = ({ cell }) => {
    const [deleteUser, deleleteResponse] = useDeleteUserMutation();
    const {
      isOpen: isOpenEdit,
      onOpen: onOpenEdit,
      onClose: onCloseEdit,
    } = useDisclosure();

    const originalRowData = cell.row.original;

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

          <ConfirmButton
            headerText="Confirm?"
            bodyText="Are you sure you want to delete?"
            onSuccessAction={() => {
              deleteUser(originalRowData.id);
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
            <ModalHeader>Edit Serving One’s Details</ModalHeader>
            <ModalCloseButton />
            <UserForm data={originalRowData} onClose={onCloseEdit} />
          </ModalContent>
        </Modal>
      </Center>
    );
  };

  return <Table table={table} />;
};

export default UserTable;
