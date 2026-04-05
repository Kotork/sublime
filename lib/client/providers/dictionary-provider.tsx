"use client";

import { createContext, useContext } from "react";
import pt from "../../../dictionaries/pt.json";

export type Dictionary = typeof pt;

const DictionaryContext = createContext<Dictionary | null>(null);

export function DictionaryProvider({
  dictionary,
  children,
}: {
  dictionary: Dictionary;
  children: React.ReactNode;
}) {
  return (
    <DictionaryContext.Provider value={dictionary}>
      {children}
    </DictionaryContext.Provider>
  );
}

export function useDictionary() {
  const dictionary = useContext(DictionaryContext);
  if (!dictionary) {
    throw new Error("useDictionary must be used within DictionaryProvider");
  }
  return dictionary;
}
