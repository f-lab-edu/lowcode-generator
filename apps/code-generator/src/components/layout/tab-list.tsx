import "./tabs-list.css";

interface TabListProps {
  tabs: string[];
  activeTab: string | undefined;
  changeTab: (nextTab: string) => void;
}

export function TabList({ tabs, activeTab, changeTab }: TabListProps) {
  return (
    <header className="main-tabs">
      <nav className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "tab active" : "tab"}
            onClick={() => changeTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>
    </header>
  );
}
