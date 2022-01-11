import { FC } from "react";
import { IconButton } from "@chakra-ui/button";
import { useClipboard } from "@chakra-ui/hooks";
import Icon from "@chakra-ui/icon";
import { Tooltip } from "@chakra-ui/tooltip";
import { buildUrlFromLink } from "../utils";
import { BiCopy as CopyIcon } from "react-icons/bi";
import * as api from "@/client/api";

interface LinkCopyButtonProps {
  link: api.types.Link;
}

const LinkCopyButton: FC<LinkCopyButtonProps> = ({ link }) => {
  const url = buildUrlFromLink(link);
  const { hasCopied, onCopy } = useClipboard(url);

  return (
    <Tooltip placement="top" label={hasCopied ? "Copied!" : "Copy Link"}>
      <IconButton
        colorScheme="whiteAlpha"
        onClick={(e) => {
          e.preventDefault();
          onCopy();
        }}
        aria-label="Copy"
        icon={<Icon as={CopyIcon} />}
      />
    </Tooltip>
  );
};

export default LinkCopyButton;
