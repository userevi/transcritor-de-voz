import useSpeachSynthesis from "@/hooks/useSpeachSynthesis";
import useSpeechRecognition from "@/hooks/useSpeechRecognition";
import React, { useState } from "react";
import * as Diff from "diff";
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { IoMicOutline, IoStopCircleOutline } from "react-icons/io5";
import { RiSpeakFill } from "react-icons/ri";
import { FaArrowRotateLeft } from "react-icons/fa6";

interface Sentence {
  value: string;
  expected?: string;
}

const ParagraphSection = ({ text }: any) => {
  const [result, setResult] = useState<string>("");
  const { speak } = useSpeachSynthesis({
    lang: "en-US",
  });
  const { isRecording, toggleRecognition, stopRecognition } = useSpeechRecognition({
    lang: "en-US",
    onResult: (text: string) => {
      stopRecognition();
      setResult((prevResult) => prevResult + " " + text);
    },
  });
  const sentenceDiff = (text1: string, text2: string) => {
    const diffResult = Diff.diffWords(
      text1.toLocaleLowerCase(),
      text2.toLocaleLowerCase()
    );

    const sentences: Sentence[] = [];
    diffResult.forEach((curr: any, index: number) => {
      // right
      if (!curr.added && !curr.removed) {
        sentences.push({
          value: curr.value,
          expected: curr.value,
        });
        return;
      }

      // different
      const prev = diffResult[index - 1];
      if (curr.added && prev && prev.removed) {
        sentences.push({
          value: curr.value,
          expected: prev.value,
        });
        return;
      }
      if (curr.added && !prev) {
        sentences.push({
          value: curr.value,
          expected: curr.value,
        });
      }
    });
    return sentences;
  };

  const sentences = sentenceDiff(text, result);

  return (
    <Flex gap={"10px"} width="100%">
      <Flex width="100%" flexWrap={"wrap"} gap={10}>
        <Box height="100%" flex={2}>
          {text}
        </Box>
        <Flex flexDir="column" gap={2}>
          <IconButton
            aria-label="Speak"
            icon={isRecording ? <IoStopCircleOutline /> : <IoMicOutline />}
            onClick={() => {
              if (!isRecording) {
                setResult("");
              }
              toggleRecognition();
            }}
          />
          {result && (
            <IconButton
              aria-label="retry"
              onClick={() => setResult("")}
              icon={<FaArrowRotateLeft />}
            />
          )}
        </Flex>
        <Box flex={1}>
          {sentences.map((sentence, index: number) => {
            return sentence.expected !== sentence.value ? (
              <Popover trigger="hover">
                <PopoverTrigger>
                  <Text key={index} as="span" color="red" textDecoration={'underline'}>
                    {sentence.value}
                  </Text>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverBody>
                    <Flex justifyContent={"space-around"} alignItems={"center"}>
                      {sentence.expected}
                      <IconButton
                        aria-label="Speak"
                        onClick={() => speak(sentence.expected!)}
                        icon={<RiSpeakFill />}
                      />
                    </Flex>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            ) : (
              sentence.value
            );
          })}
        </Box>
      </Flex>
    </Flex>
  );
};

export default ParagraphSection;
