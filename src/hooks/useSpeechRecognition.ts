import { useEffect, useRef, useState } from "react";

interface useSpeechRecognitionProps {
  onResult: (result: string) => void;
  lang: 'pt-BR' | 'en-US';
}

const useSpeechRecognition = ({ onResult, lang='pt-BR' }: useSpeechRecognitionProps) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const recognitionRef = useRef<any>(null);


  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      // @ts-ignore
      const recognitionInstance = new window.webkitSpeechRecognition();
      recognitionInstance.continuous = true;
      // recognitionInstance.lang = "pt-BR";
      recognitionInstance.lang = lang;
      recognitionInstance.maxAlternatives = 1;
      recognitionInstance.onresult = (event: any) => {
        const transcript =
          event.results[event.results.length - 1][0].transcript;
        onResult(transcript);
      };
      recognitionInstance.onstart = () => {
        setIsRecording(true);
      };
      recognitionInstance.onend = () => {
        setIsRecording(false);
      };
      recognitionInstance.onerror = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognitionInstance;
    }

    window.addEventListener("blur", () => {
      stopRecognition();
    });

    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener("blur", () => {
        stopRecognition();
      });
    };
  }, []);

  const startRecognition = () => {
    const recognition = recognitionRef.current;
    recognition.start();
  };

  const stopRecognition = () => {
    const recognition = recognitionRef.current;
    recognition.stop();
  };

  const toggleRecognition = () => {
    if (isRecording) {
      stopRecognition();
    } else {
      startRecognition();
    }
  };

  return {
    isRecording,
    startRecognition,
    stopRecognition,
    toggleRecognition,
  };
};

export default useSpeechRecognition;
