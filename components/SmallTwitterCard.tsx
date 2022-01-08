import { Text, Image, Stack, AspectRatio, Flex, Box } from "@chakra-ui/react";

interface SmallTwitterCardProps {
  image: string;
  title: string;
  description: string;
  host: string;
}

export const SmallTwitterCard: React.FC<SmallTwitterCardProps> = ({
  image,
  title,
  description,
  host,
}) => {
  return (
    <Flex
      fontFamily={`-apple-system, "system-ui", "Segoe UI"`}
      w="508px"
      bg="gray.900"
      rounded="xl"
      overflow="hidden"
      border="1px solid rgb(47, 51, 54)"
    >
      <AspectRatio ratio={1 / 1} h="132px" w="132px">
        <Image src={image} alt="" objectFit="cover" />
      </AspectRatio>
      <Flex h="132px" alignItems="center">
        <Stack spacing="4px" p="12px">
          <Text fontSize="15px" color="rgb(110, 118, 125)">
            {host}
          </Text>
          <Text fontSize="15px" color="rgb(217, 217, 217)">
            {title}
          </Text>
          <Text fontSize="15px" color="rgb(110, 118, 125)">
            {description}
          </Text>
        </Stack>
      </Flex>
    </Flex>
  );
};
