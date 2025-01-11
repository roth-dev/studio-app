import React, { createContext, PropsWithChildren } from "react";

const DatabaseContext = createContext<{}>({});
export default function DatabaseProvider({ children }: PropsWithChildren<{}>) {}
