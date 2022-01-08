import {
  Box,
  Heading,
  Text,
  Image,
  Stack,
  AspectRatio,
} from "@chakra-ui/react";

interface LargeTwitterCardProps {
  image: string;
  title: string;
  description: string;
  host: string;
}

export const LargeTwitterCard: React.FC<LargeTwitterCardProps> = ({
  image,
  title,
  description,
  host,
}) => {
  return (
    <Box
      fontFamily={`-apple-system, "system-ui", "Segoe UI"`}
      w="500px"
      bg="gray.900"
      rounded="xl"
      overflow="hidden"
      border="1px solid rgb(47, 51, 54)"
    >
      <AspectRatio ratio={16 / 9}>
        <Image src={image} alt="" objectFit="cover" />
      </AspectRatio>
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
    </Box>
  );
};
