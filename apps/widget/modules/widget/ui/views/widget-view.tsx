"use client";

import { useAtomValue } from "jotai";
// import { WidgetFooter } from "../components/widget-footer";
// import { WidgetHeader } from "../components/widget-header";
import { WidgetAuthScreen } from "@/modules/widget/ui/screens/widget-auth-screen";
import { screenAtom } from "@/modules/widget/atoms/widget-atom";
import { WidgetError } from "@/modules/widget/ui/screens/widget-error-screen";
import { WidgetLoading } from "@/modules/widget/ui/screens/widget-loading-screen";

interface Props {
  organizationId: string | null;
}
export const WidgetView = ({ organizationId }: Props) => {
  const screen = useAtomValue(screenAtom);

  const screenComponents = {
    error: <WidgetError />,
    loading: <WidgetLoading organizationId={organizationId} />,
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
