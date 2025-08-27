"use client";

import { useAtomValue } from "jotai";
// import { WidgetFooter } from "../components/widget-footer";
// import { WidgetHeader } from "../components/widget-header";
import { WidgetAuthScreen } from "@/modules/widget/ui/screens/widget-auth-screen";
import { screenAtom } from "@/modules/widget/atoms/widget-atom";

interface Props {
  organizationId: string;
}
export const WidgetView = ({ organizationId }: Props) => {
  const screen = useAtomValue(screenAtom);

  const screenComponents = {
    error: <p>Error Screen</p>,
    loading: <p>Loading Screen</p>,
    selection: <p>Selection Screen</p>,
    voice: <p>Voice Screen</p>,
    auth: <WidgetAuthScreen />,
    inbox: <p>Inbox Screen</p>,
    chat: <p>Chat Screen</p>,
    contact: <p>Contact Screen</p>,
  };
  return (
    <main className="min-h-screen  flex h-full w-full flex-col overflow-hidden rounded-xl border bg-muted">
      {screenComponents[screen]}
      {/* <WidgetFooter /> */}
    </main>
  );
};
