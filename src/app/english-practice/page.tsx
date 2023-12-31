"use client";

import useSpeachSynthesis from "@/hooks/useSpeachSynthesis";
import useSpeechRecognition from "@/hooks/useSpeechRecognition";
import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  Textarea,
  VStack,
  useBoolean,
} from "@chakra-ui/react";
import { useState } from "react";
import ParagraphSection from "../components/ParagraphSection";

const EnglishPractice = () => {
  const [text, setText] = useState<string>("");
  const [isTextConfirmed, setIsTextConfirmed] = useBoolean();

  const paragraphs = text.split("\n").filter(Boolean);
  return (
    <Box
      paddingX={{
        lg: "100px",
        md: "50px",
        sm: "20px",
      }}
      paddingTop={"30px"}>
      <VStack alignItems="flex-start" gap={"30px"}>
        <Heading>Prática de leitura em inglês</Heading>
        {isTextConfirmed ? (
          <Flex width="100%" flexDir='column' gap={10}>
            <Button width='fit-content' onClick={() => {
              setIsTextConfirmed.off();
              setText("");
            }}>Alterar texto</Button>
            {paragraphs.map((paragraph, index) => (
              <ParagraphSection key={index} text={paragraph} />
            ))}
          </Flex>
        ) : (
          <Flex width="100%" flexDir="column" gap={2}>
            <Textarea
              placeholder="Insira aqui o texto para leitura"
              height="200px"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Flex width="100%" justifyContent={"flex-end"}>
              <Button
                onClick={() => setIsTextConfirmed.on()}
                isDisabled={!text}>
                Confirmar
              </Button>
            </Flex>
          </Flex>
        )}
      </VStack>
    </Box>
  );
};

export default EnglishPractice;
