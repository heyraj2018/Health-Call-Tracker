import { useState } from "react";

interface TabsProps {
  tabs: string[];
  renderTabContent: (tab: string) => React.ReactNode;
}

export default function Tabs({ tabs, renderTabContent }: TabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div>
      <div className="flex space-x-4 border-b">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-semibold ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="mt-4">{renderTabContent(activeTab)}</div>
    </div>
  );
}
