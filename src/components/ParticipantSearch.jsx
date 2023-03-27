import { useRef, useState, useEffect } from "react";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  VStack,
  Center,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { MdHowToReg } from "react-icons/md";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  createColumnHelper,
} from "@tanstack/react-table";
import { useSelector } from "react-redux";

import { selectCurrentUser } from "../redux/features/auth/authSlice";
import { useGetParticipantSearchQuery } from "../redux/api/participantApi";
import { useAddParticipantToEventMutation } from "../redux/api/eventApi";
import ConfirmButton from "./ConfirmButton";
import { AddParticipantButton } from "../pages/Participants";
import Table from "./Table";
import { GenderColoredName } from "../utils/Formatter";

const SearchTable = ({
  data,
  eventDetail,
  eventParticipants,
  eventParticipantsWithAppointments,
}) => {
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
            name={`${info.cell.row.original.english_name} ${info.cell.row.original.chinese_name}`}
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
    columnHelper.accessor("", {
      cell: (info) => <LanguageSelector cell={info.cell} />,
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
    columnHelper.accessor("", {
      cell: (info) => <RemarksTextBox cell={info.cell} />,
      header: "Remarks",
    }),
    columnHelper.accessor("", {
      cell: (info) => <ActionButtonGroup cell={info.cell} />,
      header: "Actions",
    }),
  ];

  const languageOptions = ["English", "Chinese", "Bahasa Malaysia"];
  const languageRef = useRef([]);
  const remarksRef = useRef([]);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    initialState: {
      columnVisibility: {
        gender: false,
        english_name: false,
        chinese_name: false,
      },
    },
  });

  const [addParticipant, addResponse] = useAddParticipantToEventMutation();
  const handleRegister = async (cell) => {
    try {
      await addParticipant({
        eventId: eventDetail.id,
        participantId: cell.row.original.id,
        body: {
          language: languageRef.current[cell.row.index].value,
          remarks: remarksRef.current[cell.row.index].value,
        },
      }).unwrap();
    } catch (err) {
      let errorMessage = "";
      Object.entries(err.data).map(([key, value]) => {
        errorMessage += `${key} ${value.toString()} \n`;
        return null;
      });

      alert(errorMessage);
    }
  };

  const ActionButtonGroup = ({ cell }) => {
    const foundIndex = eventParticipants.indexOf(cell.row.original.id);
    const isDisabled = foundIndex >= 0 ? true : false;
    return (
      <Center>
        <ConfirmButton
          headerText="Confirm?"
          bodyText="Are you sure you want to register?"
          onSuccessAction={() => {
            handleRegister(cell);
          }}
          buttonIcon={<MdHowToReg size={22} />}
          buttonText="Register"
          isDanger={false}
          isLoading={addResponse.isLoading}
          isDisabled={
            isDisabled || (eventDetail.is_closed && !currentUser.isAdmin)
          }
        />
      </Center>
    );
  };

  const LanguageSelector = ({ cell }) => {
    const foundIndex = eventParticipants.indexOf(cell.row.original.id);
    const isDisabled = foundIndex >= 0 ? true : false;

    if (isDisabled) {
      return (
        <Select
          variant={"custom"}
          size="xs"
          isDisabled={
            isDisabled || (eventDetail.is_closed && !currentUser.isAdmin)
          }
          ref={(el) => (languageRef.current[cell.row.index] = el)}
        >
          <option
            value={eventParticipantsWithAppointments[foundIndex].language}
          >
            {eventParticipantsWithAppointments[foundIndex].language}
          </option>
        </Select>
      );
    } else {
      return (
        <Select
          variant={"custom"}
          size="xs"
          placeholder="Select option"
          isDisabled={
            isDisabled || (eventDetail.is_closed && !currentUser.isAdmin)
          }
          ref={(el) => (languageRef.current[cell.row.index] = el)}
        >
          {languageOptions.map((language, index) => (
            <option key={index} value={language}>
              {language}
            </option>
          ))}
        </Select>
      );
    }
  };

  const RemarksTextBox = ({ cell }) => {
    const foundIndex = eventParticipants.indexOf(cell.row.original.id);
    const isDisabled = foundIndex >= 0 ? true : false;

    return (
      <Textarea
        variant={"custom"}
        isDisabled={
          isDisabled || (eventDetail.is_closed && !currentUser.isAdmin)
        }
        ref={(el) => (remarksRef.current[cell.row.index] = el)}
        defaultValue={
          isDisabled
            ? eventParticipantsWithAppointments[foundIndex].remarks
            : ""
        }
      />
    );
  };

  return <Table table={table} />;
};

const SearchResults = ({
  searchTerm,
  eventDetail,
  eventParticipants,
  eventParticipantsWithAppointments,
}) => {
  const [filteredSearchTerm, setFilteredSearchTerm] = useState(searchTerm);
  const { data, error, isLoading, isFetching } = useGetParticipantSearchQuery(
    filteredSearchTerm,
    { skip: filteredSearchTerm === "" }
  );
  const results = data ?? [];

  useEffect(() => {
    if (searchTerm.length >= 3) {
      setFilteredSearchTerm(searchTerm);
    }
  }, [searchTerm]);

  if (error) {
    return <div className="text-hint">Error while fetching</div>;
  }

  if (isLoading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  if (isFetching) {
    return <div className="text-hint">Fetching participants...</div>;
  }

  if (results.length === 0 && searchTerm.length > 0) {
    return (
      <>
        <div className="text-hint">No Participants found</div>
        <AddParticipantButton />
      </>
    );
  }

  if (results.length > 0) {
    return (
      <SearchTable
        data={results}
        eventDetail={eventDetail}
        eventParticipants={eventParticipants}
        eventParticipantsWithAppointments={eventParticipantsWithAppointments}
      />
    );
  }
};

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const ParticipantSearch = ({
  eventDetail,
  eventParticipants,
  eventParticipantsWithAppointments,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const content = (
    <VStack>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input
          type="tel"
          placeholder="Search participants"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      <SearchResults
        searchTerm={debouncedSearchTerm}
        eventDetail={eventDetail}
        eventParticipants={eventParticipants}
        eventParticipantsWithAppointments={eventParticipantsWithAppointments}
      ></SearchResults>
    </VStack>
  );

  return content;
};

export default ParticipantSearch;
