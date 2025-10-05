'use client';

import { useState, useEffect } from 'react';

interface TTSButtonProps {
  text: string;
}

const TTSButton: React.FC<TTSButtonProps> = ({ text }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const synth = window.speechSynthesis;
      setSpeechSynthesis(synth);

      const loadVoices = () => {
        setVoices(synth.getVoices());
      };

      synth.onvoiceschanged = loadVoices;
      loadVoices(); // Call it once to handle the case where voices are already loaded.
    }
  }, []);

  const handleSpeak = () => {
    if (speechSynthesis && text) {
      if (isSpeaking) {
        speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(text);
        const googleVoice = voices.find(voice => voice.name === 'Google US English');
        if (googleVoice) {
          utterance.voice = googleVoice;
        }
        utterance.onend = () => {
          setIsSpeaking(false);
        };
        speechSynthesis.speak(utterance);
        setIsSpeaking(true);
      }
    }
  };

  return (
    <button onClick={handleSpeak} disabled={!speechSynthesis}>
      {isSpeaking ? 'Stop' : 'Read Aloud'}
    </button>
  );
};

export default TTSButton;