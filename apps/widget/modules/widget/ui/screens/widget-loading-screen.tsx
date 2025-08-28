"use client";

import { WidgetHeader } from "@/modules/widget/ui/components/widget-header";
import { useAtomValue, useSetAtom } from "jotai";
import {
  errorAtom,
  loadingMessageAtom,
  organizationIdAtom,
  screenAtom,
} from "@/modules/widget/atoms/widget-atom";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useAction, useMutation } from "convex/react";
import { api } from "@workspace/backend/convex/_generated/api";

type InitStep = "org" | "session" | "setting" | "vapi" | "done";

export const WidgetLoading = ({
  organizationId,
}: {
  organizationId: string | null;
}) => {
  const setErrorMessage = useSetAtom(errorAtom);
  const [step, setStep] = useState<InitStep>("org");
  const [sessionValid, setSessionValid] = useState<boolean>(false);
  const loadingMessage = useAtomValue(loadingMessageAtom);
  const validateOrganization = useAction(api.public.organization.valid);
  const setScreen = useSetAtom(screenAtom);
  const setLoadingMessage = useSetAtom(loadingMessageAtom);
  const setOrganizationId = useSetAtom(organizationIdAtom);

  // validate organization
  useEffect(() => {
    if (step !== "org") {
      return;
    }
    setLoadingMessage("Loading Organization...");
    if (!organizationId) {
      (setErrorMessage("Orgnaization id is required"), setScreen("error"));
      return;
    }
    setLoadingMessage("Verifying Organization...");
    validateOrganization({ organizationId })
      .then((result) => {
        if (result.valid) {
          setOrganizationId(organizationId);
          setStep("session");
        } else {
          setErrorMessage(result.reason || "");
          setScreen("error");
        }
      })
      .catch(() => {
        setErrorMessage("Unable to verify organization Id");
        setScreen("error");
      });
  }, [
    step,
    organizationId,
    setErrorMessage,
    setScreen,
    setOrganizationId,
    setStep,
    validateOrganization,
    setLoadingMessage,
  ]);

  //validate Session
  const validateSession = useMutation(api.public.contactSession.validate);
  useEffect(() => {
    
  }, []);

  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-6 font-semibold">
          <p className=" text-3xl">Hi There! 👋</p>
          <p className="text-lg"> Let&apos;s get you started</p>
        </div>
      </WidgetHeader>
      <div className="flex flex-1 gap-y-4 justify-center items-center p-4 flex-col text-muted-foreground">
        <Loader className="animate-spin" />
        <p>{loadingMessage || "Loading..."}</p>
      </div>
    </>
  );
};
