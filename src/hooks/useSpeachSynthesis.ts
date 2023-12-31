import { useEffect, useRef } from 'react'

interface useSpeachSynthesisProps {
  lang?: 'pt-BR' | 'en-US';
}

const useSpeachSynthesis = ({
  lang='pt-BR'
}: useSpeachSynthesisProps) => {
  const utteranceRef = useRef<any>(null);

  useEffect(() => {
    const utterance = new SpeechSynthesisUtterance();
    utterance.lang = lang;
    utterance.rate = 1;
    utterance.pitch = 1;
    utteranceRef.current = utterance;
  }, [])

  const speak = (text: string) => {
    const utterance = utteranceRef.current;
    utterance.text = text;
    window.speechSynthesis.speak(utterance);
}
  return {
    speak
  }
}

export default useSpeachSynthesis