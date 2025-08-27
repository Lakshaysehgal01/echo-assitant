"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Provider } from "jotai";
import * as React from "react";
const client = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL || "");
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConvexProvider client={client}>
      <Provider>{children}</Provider>
    </ConvexProvider>
  );
}
