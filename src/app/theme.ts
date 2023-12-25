"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react"

export const ThemeStore = () => {

  const search = useSearchParams();

  const defaultDark = search.get("scow_dark") === "true";

  const [dark, setDark] = useState<boolean>(defaultDark);

  return {dark, setDark};

}