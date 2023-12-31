"use client";

import ParagraphSection from "@/app/components/ParagraphSection";
import useYoutubeTranscripts from "@/hooks/useYoutubeTranscripts";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  VStack,
  useBoolean,
} from "@chakra-ui/react";
import { useState } from "react";

const EnglishPractice = () => {
  const [youtubeUrl, setYoutubeUrl] = useState<string>("");
  const { transcripts, getTranscripts } = useYoutubeTranscripts();
  const [isTextConfirmed, setIsTextConfirmed] = useBoolean();

  // const splitAndConcatenate = (inputString: string) => {
  //   // Split the string at every capital letter
  //   const sentences = inputString.split(/(?=[A-Z])/);

  //   // Initialize a new array to store the final result
  //   const finalSentences = [];

  //   // Iterate through the sentences
  //   const minWords = 10;
  //   for (let i = 0; i < sentences.length; i++) {
  //     let transformedSentence = sentences[i];
      
  //     const sentenceWords = transformedSentence.split(' ').filter(Boolean)
  //     if (sentenceWords.length <= minWords && sentences[i + 1]) {
  //       transformedSentence += sentences[i + 1];
  //       // Skip the next element
  //       finalSentences.push(transformedSentence);
  //       i += 1;
  //     } else {
  //       // If the current element contains more than one word or there is no next element, just push it to the final array
  //       finalSentences.push(transformedSentence);
  //     }
  //   }

  //   return finalSentences;
  // }

  // let paragraphs = splitAndConcatenate(transcripts.map(text => text.replaceAll('\n', ' ').replaceAll('  ', '')).filter(Boolean).join(' '));

  function joinEveryNSentences(sentences: string[], n: number) {
    const result = [];
    for (let i = 0; i < sentences.length; i += n) {
      result.push(sentences.slice(i, i + n).join(" "));
    }
    return result;
  }
  const paragraphs = joinEveryNSentences(
    transcripts
      .map((text) => text.replaceAll("\n", " ").replaceAll("  ", ""))
      .filter(Boolean),
    15
  );

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
          <Flex width="100%" flexDir="column" gap={10}>
            <Button
              width="fit-content"
              onClick={() => {
                setIsTextConfirmed.off();
                setYoutubeUrl("");
              }}>
              Alterar vídeo
            </Button>
            {paragraphs.map((paragraph, index) => (
              <ParagraphSection key={index} text={paragraph} />
            ))}
          </Flex>
        ) : (
          <Flex width="100%" flexDir="column" gap={2}>
            <Input
              placeholder="Insira a url do vídeo"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
            />
            <Flex width="100%" justifyContent={"flex-end"}>
              <Button
                onClick={() => {
                  setIsTextConfirmed.on();
                  getTranscripts(youtubeUrl);
                }}
                isDisabled={!youtubeUrl}>
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
