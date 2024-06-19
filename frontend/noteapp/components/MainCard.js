"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Button, ButtonGroup, Box, Text } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Textarea,
  Input,
} from "@chakra-ui/react";
import { useDisclosure, useToast } from "@chakra-ui/react";
import axios from "axios";

function MainCard({ title, content, id }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalData, setModalData] = useState({
    title: title,
    content: content,
  });
  const toast = useToast();

  const deleteNote = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5005/api/notes/delete/${id}`
      );
      toast({
        title: "Note  Deleted.",
        description: "Your note has been deleted successfully.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const editNote = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5005/api/notes/update/${id}`,
        modalData
      );
      toast({
        title: "Note  Updated.",
        description: "Your note has been updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      maxW="xl"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      className="mt-4 w-full p-3"
    >
      <Box p="2">
        <Box d="flex" alignItems="baseline">
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
          >
            {title}
          </Box>
        </Box>
        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
          {content}
        </Box>
      </Box>
      <div className="flex justify-end">
        <ButtonGroup>
          <Button onClick={onOpen} colorScheme="blue">
            Edit
          </Button>
          <Button onClick={deleteNote} colorScheme="red">
            Delete
          </Button>
        </ButtonGroup>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody padding={3} margin={3}>
            <Text mb="8px">Value:</Text>
            <Input
              value={modalData.title}
              onChange={(e) =>
                setModalData((prevstate) => ({
                  ...prevstate,
                  title: e.target.value,
                }))
              }
              variant="filled"
              placeholder="Title"
            />
            <Text mb="8px" mt="8px">
              Note :
            </Text>
            <Textarea
              value={modalData.content}
              onChange={(e) =>
                setModalData((prevstate) => ({
                  ...prevstate,
                  content: e.target.value,
                }))
              }
              placeholder="Fill in your note"
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={editNote} variant="ghost">
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default MainCard;
