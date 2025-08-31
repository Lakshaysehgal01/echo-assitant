"use client";

import { useAtomValue } from "jotai";
// import { WidgetFooter } from "../components/widget-footer";
// import { WidgetHeader } from "../components/widget-header";
import { WidgetAuthScreen } from "@/modules/widget/ui/screens/widget-auth-screen";
import { screenAtom } from "@/modules/widget/atoms/widget-atom";
import { WidgetError } from "@/modules/widget/ui/screens/widget-error-screen";
import { WidgetLoading } from "@/modules/widget/ui/screens/widget-loading-screen";
import { WidgetSelectionScreen } from "@/modules/widget/ui/screens/widget-selection-screen";
import { WidgetChatScreen } from "../screens/widget-chat-screen";

interface Props {
  organizationId: string | null;
}
export const WidgetView = ({ organizationId }: Props) => {
  const screen = useAtomValue(screenAtom);

  const screenComponents = {
    error: <WidgetError />,
    loading: <WidgetLoading organizationId={organizationId} />,
    selection: <WidgetSelectionScreen />,
    voice: <p>Voice Screen</p>,
    auth: <WidgetAuthScreen />,
    inbox: <p>Inbox Screen</p>,
    chat: <WidgetChatScreen />,
    contact: <p>Contact Screen</p>,
  };
  return (
    <main className="min-h-screen  flex h-full w-full flex-col overflow-hidden rounded-xl border bg-muted">
      {screenComponents[screen]}
      {/* <WidgetFooter /> */}
    </main>
  );
};
