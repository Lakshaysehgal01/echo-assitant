"use client";

import { WidgetHeader } from "@/modules/widget/ui/components/widget-header";
import { Button } from "@workspace/ui/components/button";
import { useAtomValue, useSetAtom } from "jotai";
import { ArrowLeftIcon, MenuIcon } from "lucide-react";
import {
  contactSessionIdAtomFamily,
  converstaionIdAtom,
  organizationIdAtom,
  screenAtom,
} from "../../atoms/widget-atom";
import { useQuery } from "convex/react";
import { api } from "@workspace/backend/convex/_generated/api";

export const WidgetChatScreen = () => {
  const setScreen = useSetAtom(screenAtom);
  const setConversationId = useSetAtom(converstaionIdAtom);
  const conversationId = useAtomValue(converstaionIdAtom);
  const organizationId = useAtomValue(organizationIdAtom);
  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(organizationId || "")
  );
  const conversation = useQuery(
    api.public.conversation.getOne,
    conversationId && contactSessionId
      ? { conversationId, contactSessionId }
      : "skip"
  );

  const onBack = () => {
    setConversationId(null);
    setScreen("selection");
  };
  return (
    <>
      <WidgetHeader className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <Button size={"icon"} variant={"transparent"} onClick={onBack}>
            <ArrowLeftIcon />
          </Button>
          <p>Chat</p>
        </div>
        <Button size={"icon"} variant={"transparent"}>
          <MenuIcon />
        </Button>
      </WidgetHeader>
      <div className="flex flex-1 gap-y-4 justify-center items-center p-4 flex-col text-muted-foreground">
        {JSON.stringify(conversation)}
      </div>
    </>
  );
};
