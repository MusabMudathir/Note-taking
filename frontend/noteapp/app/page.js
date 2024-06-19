"use client";
import { useState, useEffect } from "react";
import { Button, ButtonGroup, Box, Text } from "@chakra-ui/react";
import MainCard from "@/components/MainCard";
import axios from "axios";
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

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);
  const toast = useToast();
  const getNotes = async () => {
    try {
      const notesGetter = await axios.get("http://localhost:5005/api/notes");
      setNotes(notesGetter.data.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  const createNote = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5005/api/notes/create",
        {
          title,
          content,
        }
      );
      toast({
        title: "Note  Created.",
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
    <main className=" w-full  flex flex-col items-center justify-center">
      <div className="flex w-3/4 flex-row items-center justify-around w-full p-2">
        <h1 className="text-4xl font-bold text-gray-800">My Notes</h1>
        <Button onClick={onOpen} colorScheme="yellow">
          New Note
        </Button>
      </div>
      {notes.length > 0 ? (
        notes?.map((note) => (
          <MainCard
            key={note._id}
            title={note.title}
            content={note.content}
            id={note._id}
          />
        ))
      ) : (
        <h1> No Notes added</h1>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody padding={3} margin={3}>
            <Text mb="8px">Value:</Text>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              variant="filled"
              placeholder="Title"
            />
            <Text mb="8px" mt="8px">
              Note :
            </Text>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Fill in your note"
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={createNote}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </main>
  );
}
