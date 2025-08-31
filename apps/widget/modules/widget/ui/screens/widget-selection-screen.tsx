"use client";

import { WidgetHeader } from "@/modules/widget/ui/components/widget-header";
import { Button } from "@workspace/ui/components/button";
import { useAtomValue, useSetAtom } from "jotai";
import { ChevronRightIcon, MessageSquareTextIcon } from "lucide-react";
import {
  contactSessionIdAtomFamily,
  converstaionIdAtom,
  errorAtom,
  organizationIdAtom,
  screenAtom,
} from "../../atoms/widget-atom";
import { useMutation } from "convex/react";
import { api } from "@workspace/backend/convex/_generated/api";
import { useState } from "react";

export const WidgetSelectionScreen = () => {
  const setScreen = useSetAtom(screenAtom);
  const organizationId = useAtomValue(organizationIdAtom);
  const setErrorMessage = useSetAtom(errorAtom);
  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(organizationId || "")
  );

  const [isPending, setIsPending] = useState<boolean>(false);

  const createConversation = useMutation(api.public.conversation.create);

  const setConversationId = useSetAtom(converstaionIdAtom);

  const handleNewConversations = async () => {
    if (!organizationId) {
      setErrorMessage("Missing Organization Id");
      setScreen("error");
      return;
    }
    if (!contactSessionId) {
      setScreen("auth");
      return;
    }

    try {
      setIsPending(true);
      const conversationId = await createConversation({
        contactSessionId,
        organizationId,
      });
      setConversationId(conversationId);
      setScreen("chat");
    } catch {
      setScreen("auth");
    } finally {
      setIsPending(false);
    }
  };
  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-6 font-semibold">
          <p className=" text-3xl">Hi There! 👋</p>
          <p className="text-lg"> Let&apos;s get you started</p>
        </div>
      </WidgetHeader>
      <div className="flex flex-1 gap-y-4 p-4 flex-col overflow-y-auto">
        <Button
          variant={"outline"}
          onClick={handleNewConversations}
          disabled={isPending}
          className="h-16 w-full justify-between"
        >
          <div className="flex items-center gap-x-2">
            <MessageSquareTextIcon className="size-4" />
            <span>Start Chat</span>
          </div>
          <ChevronRightIcon />
        </Button>
      </div>
    </>
  );
};
