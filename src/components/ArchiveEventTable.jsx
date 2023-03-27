import { Box } from "@chakra-ui/react";
import { useGetArchivedEventsQuery } from "../redux/api/eventApi";
import EventTable from "./EventTable";
import Spinner from "./Spinner";

const ArchiveEventTable = () => {
  const { data, isLoading, isSuccess, isError, error } =
    useGetArchivedEventsQuery();

  if (isSuccess) {
    return <EventTable data={data} />;
  } else if (isLoading) {
    return (
      <Box position="relative">
        <Spinner />
      </Box>
    );
  } else if (isError) {
    return <div>{error.toString()}</div>;
  }
};

export default ArchiveEventTable;
