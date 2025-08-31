import { atom } from "jotai";
import { WIDGETSCREEN } from "@/modules/widget/types";
import { atomFamily, atomWithStorage } from "jotai/utils";
import { CONATCT_SESSION_KEY } from "@/modules/widget/constant";
import { Id } from "@workspace/backend/convex/_generated/dataModel";

export const screenAtom = atom<WIDGETSCREEN>("loading");

export const errorAtom = atom<string | null>("some error occured");

export const loadingMessageAtom = atom<string | null>(null);

export const organizationIdAtom = atom<string | null>(null);

export const contactSessionIdAtomFamily = atomFamily(
  (organizationId: string) => {
    return atomWithStorage<Id<"contactSession"> | null>(
      `${CONATCT_SESSION_KEY}_${organizationId}`,
      null
    );
  }
);

export const converstaionIdAtom = atom<Id<"conversations"> | null>(null);
