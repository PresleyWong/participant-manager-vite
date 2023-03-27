import {
  IconButton,
  ButtonGroup,
  Flex,
  Text,
  Tooltip,
  Center,
} from "@chakra-ui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@chakra-ui/icons";

const Pagination = ({ table }) => {
  if (table.getPageCount() > 0)
    return (
      <Center>
        <ButtonGroup variant="outline" spacing="0" mt="5">
          <Tooltip label="First Page">
            <IconButton
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              icon={<ArrowLeftIcon h={3} w={3} />}
            />
          </Tooltip>

          <Tooltip label="Previous Page">
            <IconButton
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              icon={<ChevronLeftIcon h={6} w={6} />}
              mr={4}
            />
          </Tooltip>

          <Flex alignItems="center" mr={4}>
            <Text flexShrink="0">
              Page{" "}
              <Text fontWeight="bold" as="span">
                {table.getState().pagination.pageIndex + 1}
              </Text>{" "}
              of{" "}
              <Text fontWeight="bold" as="span">
                {table.getPageCount()}
              </Text>
            </Text>
          </Flex>

          <Tooltip label="Next Page">
            <IconButton
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              icon={<ChevronRightIcon h={6} w={6} />}
            />
          </Tooltip>
          <Tooltip label="Last Page">
            <IconButton
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              icon={<ArrowRightIcon h={3} w={3} />}
            />
          </Tooltip>
        </ButtonGroup>
      </Center>
    );
};

export default Pagination;
