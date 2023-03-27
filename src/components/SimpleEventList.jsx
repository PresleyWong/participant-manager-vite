import {
  Grid,
  GridItem,
  Heading,
  CardBody,
  Stack,
  StackDivider,
  Box,
  Text,
  Spinner,
  Center,
  VStack,
  Button,
  Card,
  CardHeader,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom";

import { useGetEventsWithLimitQuery } from "../redux/api/eventApi";
import { AttachmentsList, CustomDateTimeFormat } from "../utils/Formatter";

const SimpleEventList = ({ currentUser }) => {
  const { data, isLoading, isSuccess, isError, error } =
    useGetEventsWithLimitQuery(12);

  const bodyBg = useColorModeValue("white", "neutral.20");
  const bodyTextColor = useColorModeValue("black", "neutral.80");
  const announceHeaderBg = useColorModeValue("neutral.40", "neutral.0");
  const announceHeaderColor = useColorModeValue("neutral.100", "neutral.80");

  let content;

  if (isSuccess) {
    content = (
      <>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            {data.map((item, index) => (
              <Box key={index}>
                <Grid
                  templateColumns={{
                    base: "repeat(12, 1fr)",
                  }}
                >
                  <GridItem
                    style={{ alignSelf: "center" }}
                    colSpan={{
                      base: currentUser ? 4 : 6,
                    }}
                  >
                    <VStack style={{ alignItems: "flex-start" }}>
                      <Heading size="xs" textTransform="uppercase">
                        {item.title}
                      </Heading>

                      <Box>
                        <Text fontSize="sm">
                          <CustomDateTimeFormat
                            timeStamp={item.end_date}
                            type="date"
                          />{" "}
                          to{" "}
                          <CustomDateTimeFormat
                            timeStamp={item.end_date}
                            type="date"
                          />
                        </Text>
                      </Box>
                    </VStack>
                  </GridItem>

                  <GridItem
                    style={{ alignSelf: "center" }}
                    colSpan={{
                      base: currentUser ? 4 : 6,
                    }}
                  >
                    <AttachmentsList
                      filesArray={item.attachments}
                      isLink={true}
                    />
                  </GridItem>

                  {currentUser && (
                    <GridItem
                      style={{ alignSelf: "center", textAlign: "center" }}
                      colSpan={{
                        base: 4,
                      }}
                    >
                      <VStack style={{ alignItems: "center" }}>
                        <Button
                          size="sm"
                          as={ReachLink}
                          to={`/events/${item.id}`}
                          variant={"primary"}
                        >
                          {item.is_closed ? "View" : "Register"}
                        </Button>
                      </VStack>
                    </GridItem>
                  )}
                </Grid>
              </Box>
            ))}
          </Stack>
        </CardBody>
      </>
    );
  } else if (isLoading) {
    content = (
      <Center>
        <Spinner />
      </Center>
    );
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return (
    <Card bg={bodyBg} color={bodyTextColor} boxShadow="lg" width="100%">
      <CardHeader bg={announceHeaderBg} color={announceHeaderColor}>
        <Heading size="md">Upcoming Events</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          {content}
        </Stack>
      </CardBody>
    </Card>
  );
};

export default SimpleEventList;
