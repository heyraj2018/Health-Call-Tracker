import { useEffect, useState } from "react";
import axios from "axios";

interface TelecallingMetricsProps {
  period: string;
}

interface Metrics {
  outcalls: number;
  callbacks: number;
  quotes: number;
  policies: number;
  callbacks_done: number;
  [key: string]: number;
}

export default function TelecallingMetrics({ period }: TelecallingMetricsProps) {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    axios
      .get(`/api/metrics?period=${period.toLowerCase().replace(" ", "_")}`)
      .then((res) => {
        setMetrics(res.data);
      })
      .catch(() => {
        setError("Failed to load metrics.");
        setMetrics(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [period]);

  if (loading) return <div className="text-gray-500">Loading {period}...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!metrics) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Object.entries(metrics).map(([key, value]) => (
        <div
          key={key}
          className="rounded-xl bg-white shadow-md p-4 border hover:shadow-lg transition"
        >
          <div className="text-gray-500 text-sm capitalize">{key.replace(/_/g, " ")}</div>
          <div className="text-2xl font-semibold text-blue-600 mt-1">{value}</div>
        </div>
      ))}
    </div>
  );
}
