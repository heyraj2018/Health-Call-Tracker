import React, { useEffect, useState } from "react";

const allColumns = [
  "id", "created_by", "issued_date", "customer_name", "policy_number",
  "regn_no", "mobile_number", "make", "model", "company",
  "Health_Call_Status", "Call_Back_Asked", "Quote_Sent", "Did_Not_Pick",
  "Health_Policy_Issued", "Last Updated by User", "Update_History"
];

const statusOptions = ["Pending", "In Progress", "Completed"];

const CallAssistTable = () => {
  const [data, setData] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [visibleColumns, setVisibleColumns] = useState<string[]>([...allColumns]);

  useEffect(() => {
    fetch("/api/calls")
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error("Error fetching call data:", err));
  }, []);

  const handleColumnToggle = (col: string) => {
    setVisibleColumns((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    );
  };

  const filteredData = statusFilter
    ? data.filter((d) => d.Health_Call_Status === statusFilter)
    : data;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Call Assist</h1>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div>
          <label className="font-medium mr-2">Filter by Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded px-3 py-1"
          >
            <option value="">All</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label className="font-medium">Toggle Columns:</label>
          {allColumns.map((col) => (
            <label key={col} className="text-sm">
              <input
                type="checkbox"
                checked={visibleColumns.includes(col)}
                onChange={() => handleColumnToggle(col)}
                className="mr-1"
              />
              {col.replace(/_/g, " ")}
            </label>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              {visibleColumns.map((col) => (
                <th key={col} className="border p-2 text-left text-sm font-medium">
                  {col.replace(/_/g, " ")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50">
                {visibleColumns.map((col) => (
                  <td key={col} className="border p-2 text-sm">
                    {String(row[col] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan={visibleColumns.length} className="text-center py-6 text-gray-500">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CallAssistTable;
