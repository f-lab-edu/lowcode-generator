import { useState, useTransition } from "react";
export const useTabTransition = (tabs: string[]) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [isPending, startTransition] = useTransition();

  function changeTab(nextTab: string) {
    startTransition(() => setActiveTab(nextTab));
  }

  return {
    tabs,
    activeTab,
    changeTab,
    isPending,
  };
};
