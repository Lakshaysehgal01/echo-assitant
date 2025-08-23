import Vapi from "@vapi-ai/web";
import { useEffect, useState } from "react";
interface TranscriptMessage {
  role: "user" | "assistant";
  content: string;
}
export const useVapi = () => {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);
  useEffect(() => {
    //only for testing otherwise customer will provide api-keys
    const vapiInstance = new Vapi("96c38f7a-fd40-4c84-84c5-e628f817d7f9");
    setVapi(vapiInstance);

    vapiInstance.on("call-start", () => {
      setIsConnected(true);
      setIsConnecting(false);
      setTranscript([]);
    });

    vapiInstance.on("call-end", () => {
      setIsConnected(false);
      setIsConnecting(false);
      setIsSpeaking(false);
    });

    vapiInstance.on("speech-end", () => {
      setIsSpeaking(false);
    });

    vapiInstance.on("error", (error) => {
      console.log("Vapi Error:", error);
      setIsConnecting(false);
    });

    vapiInstance.on("message", (message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        setTranscript((prev) => [
          ...prev,
          {
            role: message.role === "user" ? "user" : "assistant",
            content: message.transcript,
          },
        ]);
      }
    });

    return () => {
      vapiInstance?.stop();
    };
  }, []);

  const startCall = () => {
    setIsConnecting(true);
    if (vapi) {
      //only for testing otherwise customer will provide api-keys
      vapi.start("f67a10ae-2dbd-4f44-97fc-d7def33730c0");
    }
  };

  const endCall = () => {
    if (vapi) {
      vapi.stop();
    }
  };
  return{
    isConnected,
    isConnecting,
    isSpeaking,
    transcript,
    startCall,
    endCall,
  }
};
