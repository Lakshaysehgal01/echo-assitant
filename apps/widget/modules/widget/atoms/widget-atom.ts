import { atom } from "jotai";
import { WIDGETSCREEN } from "../types";

export const screenAtom = atom<WIDGETSCREEN>("loading");

export const errorAtom = atom<string | null>("some error occured");

export const loadingMessageAtom = atom<string | null>(null);

export const organizationIdAtom = atom<string | null>(null);
