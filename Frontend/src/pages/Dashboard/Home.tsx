import PageMeta from "../../components/common/PageMeta";
import Tabs from "../../components/telecalling/Tabs";

import TelecallingMetrics from "../../components/telecalling/TelecallingMetrics";

export default function Home() {
  return (
    <>
      <PageMeta
        title="Telecalling Dashboard"
        description="Admin dashboard for Telecalling metrics"
      />
      <div className="p-4 md:p-6">
        <Tabs
          tabs={["Today's Metrics", "Monthly Metrics", "Lifetime Metrics"]}
          renderTabContent={(tab) => (
            <TelecallingMetrics period={tab} />
          )}
        />
      </div>
    </>
  );
}
