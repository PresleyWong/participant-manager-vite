import { Link as ReachLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { MoonIcon, SunIcon, HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { TbLogout } from "react-icons/tb";
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Icon,
  Text,
} from "@chakra-ui/react";

import { indexApi } from "../redux/api/indexApi";
import {
  selectCurrentUser,
  clearCredentials,
} from "../redux/features/auth/authSlice";

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    variant={"custom"}
    as={ReachLink}
    to={children.href}
    _hover={{ bg: "none" }}
  >
    {children.linkTitle}
  </Link>
);

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);

  const titleBg = useColorModeValue("neutralVariant.90", "neutralVariant.20");
  const navbarBg = useColorModeValue("primary.60", "primary.40");
  const navbarColor = useColorModeValue("secondary.100", "primary.90");

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(clearCredentials());
    dispatch(indexApi.util.resetApiState());
    navigate("/");
    window.location.reload(false);
  };

  let LinkItems = [
    { linkTitle: "Events", href: "/events" },
    { linkTitle: "Participants", href: "/participants" },
  ];

  if (currentUser?.isAdmin) {
    LinkItems = [...LinkItems, { linkTitle: "Users", href: "/users" }];
  }

  const UserMenu = () => {
    let output;

    if (currentUser) {
      output = (
        <Menu>
          <MenuButton
            as={Button}
            rounded={"full"}
            cursor={"pointer"}
            variant={"username"}
            boxShadow="lg"
          >
            {`${currentUser.name} | ${currentUser.locality}`}
          </MenuButton>

          <MenuList minW={0} ml={"5"} width={"100%"}>
            <MenuItem onClick={handleLogout}>
              <Icon as={TbLogout} />
              <span>Sign out</span>
            </MenuItem>
          </MenuList>
        </Menu>
      );
    } else {
      output = (
        <Button as={ReachLink} to={"/login"} variant={"primary"} boxShadow="lg">
          Login
        </Button>
      );
    }
    return output;
  };

  return (
    <>
      <Box px={4} bg={titleBg}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <Link
              as={ReachLink}
              to={"/"}
              color={"teal"}
              _hover={{ textDecoration: "none" }}
            >
              <Text as="b">Participant Manager</Text>
            </Link>
          </HStack>
          <Flex alignItems={"center"}>
            <Button
              onClick={toggleColorMode}
              rounded={"full"}
              mr={3}
              variant={"username"}
              boxShadow="lg"
            >
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
            <UserMenu />
          </Flex>
        </Flex>
      </Box>
      <Box bg={navbarBg} color={navbarColor} px={4}>
        <Flex h={10} align={"center"} justify={"center"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
            bg={useColorModeValue("#386a24", "gray.500")}
            colorScheme="teal"
          />
          <HStack spacing={8} align={"center"}>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {LinkItems.map((link, index) => (
                <NavLink key={index}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
        </Flex>

        {isOpen ? (
          <HStack spacing={8} align={"center"} justify={"center"}>
            <Box px={4} display={{ md: "none" }}>
              <Stack as={"nav"} spacing={4} align={"center"} justify={"center"}>
                {LinkItems.map((link, index) => (
                  <NavLink key={index}>{link}</NavLink>
                ))}
              </Stack>
            </Box>
          </HStack>
        ) : null}
      </Box>
    </>
  );
};

export default Header;
