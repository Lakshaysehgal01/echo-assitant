"use client";
import { useVapi } from "@/modules/widget/hooks/use-vapi";
import { Button } from "@workspace/ui/components/button";
export default function Page() {
  const {
    isConnected,
    isConnecting,
    isSpeaking,
    transcript,
    startCall,
    endCall,
  } = useVapi();
  console.log(isConnected);
  return (
    <div className="flex flex-col items-center justify-center min-h-svh max-w-md mx-auto w-full">
      <Button onClick={() => startCall()}>Start Call</Button>
      <Button onClick={() => endCall()} variant={"destructive"}>
        End Call
      </Button>
      <p>Is Connected :{isConnected ? "true" : "false"}</p>
      <p>Is Connecting :{isConnecting ? "true" : "false"}</p>
      <p>Is Speaking :{isSpeaking ? "true" : "false"}</p>
      {JSON.stringify(transcript, null, 2)}
    </div>
  );
}
