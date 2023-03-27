import { Grid, GridItem } from "@chakra-ui/react";

import Login from "./Login";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/features/auth/authSlice";
import SimpleEventList from "../components/SimpleEventList";

const Homepage = () => {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <Grid
      templateColumns={{ md: "repeat(12, 1fr)", base: "repeat(1, 1fr)" }}
      columnGap={{ md: 5 }}
      rowGap={{ base: 5, md: 0 }}
      width="100%"
    >
      <GridItem colSpan={{ lg: currentUser ? 0 : 4, md: currentUser ? 0 : 5 }}>
        {!currentUser && <Login />}
      </GridItem>
      <GridItem colSpan={{ lg: currentUser ? 12 : 8, md: currentUser ? 0 : 7 }}>
        <SimpleEventList currentUser={currentUser} />
      </GridItem>
    </Grid>
  );
};

export default Homepage;
