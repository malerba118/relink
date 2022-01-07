import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { supabase } from "@/client/api/supabase";
import { nanoid } from "nanoid";
import { CloudUploadIcon } from "@heroicons/react/solid";
import { useMutation } from "react-query";
import { Spinner, Image, Box, Stack } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

const variants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.15,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.15,
    },
  },
};

interface MediaUploaderProps {
  url?: string | null;
  bucket: string;
  folder?: string;
  filePrefix?: string;
  onError?: (err: any) => void;
  onUpload: (url: string | null) => void;
  className?: string;
  prompt?: string;
  enableCleanup?: boolean;
}

export function MediaUploader({
  url,
  bucket,
  folder,
  filePrefix = "",
  onError,
  onUpload,
  className,
  prompt = "Upload a File",
}: MediaUploaderProps) {
  const [hovered, setHovered] = useState(false);

  const upsertFile = (path: string, file: any) => {
    return supabase.storage
      .from(bucket)
      .upload(path, file, { upsert: true })
      .then(({ data, error }) => {
        if (error) {
          return Promise.reject(error);
        }
        return data;
      });
  };
  const mutation = useMutation(
    ({ path, file }: any) => upsertFile(path, file),
    {
      onSuccess: (data, variables) => {
        const newUrl = supabase.storage
          .from(bucket)
          .getPublicUrl(variables.path).publicURL;
        onUpload?.(newUrl);
      },
      onError: (error) => {
        onError?.(error);
      },
    }
  );

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const newPathArray = [];
    if (typeof folder === "string" && !!folder) {
      newPathArray.push(...folder.split("/"));
    }
    newPathArray.push(filePrefix + nanoid());
    const newPath = newPathArray.join("/");

    mutation.mutate({ path: newPath, file });
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const inputProps = getInputProps();

  return (
    <Box
      {...getRootProps()}
      className={clsx(
        // "h-[200px] bg-gray-800 relative overflow-hidden cursor-pointer",
        className
      )}
      h="220px"
      bg="whiteAlpha.50"
      position="relative"
      overflow="hidden"
      cursor="pointer"
      rounded="md"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <input
        {...inputProps}
        style={{ ...inputProps.style, width: "100%", height: "100%" }}
      />
      {url && (
        <Image
          //   className="object-cover w-full h-full"
          objectFit="cover"
          w="100%"
          h="100%"
          src={url}
          alt="Media Uploader Preview"
        />
      )}
      <AnimatePresence initial={false}>
        {(!url || (url && hovered)) && !mutation.isLoading && (
          <motion.div
            key="upload-msg"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            // className="bg-gray-800 pointer-events-none bg-opacity-60 overlay center"
            style={{
              pointerEvents: "none",
              opacity: 0.6,
              display: "grid",
              placeItems: "center",
              position: "absolute",
              inset: 0,
              backgroundColor: url
                ? "var(--chakra-colors-blackAlpha-600)"
                : "transparent",
            }}
          >
            <Stack
              h="100%"
              w="100%"
              justifyContent="center"
              alignItems="center"
            >
              <Box w="24px" h="24px" margin="0 auto">
                <CloudUploadIcon />
              </Box>
              {prompt && <p className="text-center">{prompt}</p>}
            </Stack>
          </motion.div>
        )}
        {mutation.isLoading && (
          <motion.div
            key="spinner"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            style={{
              pointerEvents: "none",
              opacity: 0.6,
              display: "grid",
              placeItems: "center",
              position: "absolute",
              inset: 0,
            }}
            // className="bg-gray-800 pointer-events-none bg-opacity-60 overlay center"
          >
            <Spinner />
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}
