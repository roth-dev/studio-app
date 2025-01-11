import React, {
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from "react";

export type TabType = "table" | "query" | "digram";

export interface Tab {
  name: string;
  component: null | React.ReactElement;
}
interface State {
  tabs: Tab[];
}

type ContextType = State & {
  setTab: (tab: Tab) => void;
  removeTab: (index: number) => void;
};
const TabContenxt = React.createContext<ContextType>({
  tabs: [],
  setTab() {},
  removeTab() {},
});

export const useTab = () => React.useContext(TabContenxt);

export default function TabProvider({ children }: PropsWithChildren<{}>) {
  const [tabs, setTabs] = useState<Tab[]>([
    {
      name: "New Tab",
      component: null,
    },
  ]);

  const handleTab = useCallback((tab: Tab) => {
    setTabs((prev) => prev.concat(tab));
  }, []);

  const handleRemoveTab = useCallback(
    (index: number) => {
      setTabs((prev) => {
        return prev.filter((_, idx) => idx !== index);
      });
    },
    [tabs]
  );

  const value: ContextType = useMemo(() => {
    return {
      tabs,
      setTab: handleTab,
      removeTab: handleRemoveTab,
    };
  }, [tabs, handleTab, handleRemoveTab]);

  return <TabContenxt.Provider value={value}>{children}</TabContenxt.Provider>;
}
