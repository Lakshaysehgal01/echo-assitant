"use client";

import { WidgetHeader } from "@/modules/widget/ui/components/widget-header";
import { useAtomValue } from "jotai";
import { errorAtom } from "@/modules/widget/atoms/widget-atom";
import { AlertTriangleIcon } from "lucide-react";

export const WidgetError = () => {
  const errorMessage = useAtomValue(errorAtom);
  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-6 font-semibold">
          <p className=" text-3xl">Hi There! 👋</p>
          <p className="text-lg"> Let&apos;s get you started</p>
        </div>
      </WidgetHeader>
      <div className="flex flex-1 gap-y-4 justify-center items-center p-4 flex-col text-muted-foreground">
        <AlertTriangleIcon />
        <p>{errorMessage || "Inavlid configuration"}</p>
      </div>
    </>
  );
};
