import {
  IconButton,
  VStack,
  Text,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdOutlineDescription } from "react-icons/md";

export const GenderColoredName = ({ name, gender }) => {
  let nameArray = name.split(" ");
  const brotherColor = useColorModeValue("#366A25", "#98D682");
  const sisterColor = useColorModeValue("#B92123", "#FEB5AD");

  return (
    <div>
      <span
        style={{
          color: gender === "Brother" ? brotherColor : sisterColor,
          fontWeight: "bold",
        }}
      >
        {nameArray.length > 0 && nameArray[0]}
      </span>
      <br />
      {nameArray.length > 1 && nameArray[1]}
    </div>
  );
};

export const VStackDateTime = ({ timestamp }) => {
  const dateArray = timestamp.match(/^(\S+)\s(.*)/).slice(1);

  if (dateArray.length === 2) {
    return (
      <VStack spacing={0}>
        <span>{dateArray[0]}</span>
        <span>{dateArray[1]}</span>
      </VStack>
    );
  }
};

export const AttachmentsList = ({ filesArray, isLink = false }) => {
  let content;

  if (isLink) {
    content = filesArray.map((file, index) => (
      <Link
        isExternal
        key={index}
        href={`${import.meta.env.REACT_APP_ROOT_ENDPOINT}${file.url}`}
      >
        <IconButton
          variant="unstyled"
          colorScheme="teal"
          size="lg"
          icon={<MdOutlineDescription />}
          minW={5}
          height={5}
        />
        {file.url.split("/").pop().replace(/%20/g, " ")}
      </Link>
    ));
  } else {
    content = filesArray.map((file, index) => (
      <Text align="center" key={index}>
        {file.url.split("/").pop().replace(/%20/g, " ")}
      </Text>
    ));
  }

  return (
    <VStack spacing={0} style={{ alignItems: "center" }}>
      {content}
    </VStack>
  );
};

export const CustomDateTimeFormat = ({ timeStamp, type }) => {
  const days = ["LD", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let dateObj = new Date(timeStamp);

  switch (type) {
    case "date":
      const dayName = days[dateObj.getDay()];
      const monthName = months[dateObj.getMonth()];
      const yearName = dateObj.getFullYear();
      const dateName = dateObj.getDate();
      return `${monthName} ${dateName}, ${yearName} (${dayName})`;
    case "time":
      return dateObj.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
    default:
      return dateObj.toLocaleDateString("en-us", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      });
  }
};
