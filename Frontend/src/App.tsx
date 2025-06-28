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
  const [visibleColumns, setVisibleColumns] = useState([...allColumns]);
  const [toggleOpen, setToggleOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [editingRow, setEditingRow] = useState<any | null>(null);
  const [editValues, setEditValues] = useState<any>({});

  useEffect(() => {
    fetch("/api/calls")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      })
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

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-white">Call Assist</h1>

      <div className="flex flex-wrap gap-6 mb-4 items-start">
        {/* Filter by Status */}
        <div>
          <label className="font-medium mr-2 text-white">Filter by Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
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

        {/* Column Toggle Dropdown */}
        <div className="relative">
          <button
            onClick={() => setToggleOpen(!toggleOpen)}
            className="border rounded px-3 py-1 bg-gray-800 text-white"
          >
            Toggle Columns
          </button>

          {toggleOpen && (
            <div className="absolute z-10 bg-white text-black border rounded shadow p-3 max-h-64 overflow-y-auto mt-2 w-64">
              {allColumns.map((col) => (
                <label key={col} className="block text-sm mb-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={visibleColumns.includes(col)}
                    onChange={() => handleColumnToggle(col)}
                    className="mr-2"
                  />
                  {col.replace(/_/g, " ")}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Data Table */}
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
            {paginatedData.map((row, i) => (
              <tr
                key={i}
                className="hover:bg-gray-100 cursor-pointer"
                onDoubleClick={() => {
                  setEditingRow(row);
                  setEditValues({ ...row });
                }}
              >
                {visibleColumns.map((col) => (
                  <td key={col} className="border p-2 text-sm">
                    {String(row[col] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
            {paginatedData.length === 0 && (
              <tr>
                <td colSpan={visibleColumns.length} className="text-center py-6 text-gray-500">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <div>
          <label className="text-sm mr-2 text-white">Rows per page:</label>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border rounded px-2 py-1"
          >
            {[10, 25, 50, 100].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 items-center">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm text-white">
            Page {currentPage} of {totalPages || 1}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {editingRow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-2xl w-full overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold mb-4">Edit Record</h2>
            <div className="grid grid-cols-2 gap-4">
              {allColumns.map((col) => (
                <div key={col} className="flex flex-col">
                  <label className="text-sm font-medium mb-1">
                    {col.replace(/_/g, " ")}
                  </label>
                  <input
                    type="text"
                    value={editValues[col] ?? ""}
                    onChange={(e) =>
                      setEditValues((prev) => ({ ...prev, [col]: e.target.value }))
                    }
                    className="border px-2 py-1 rounded text-sm"
                  />
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => {
                  const updated = data.map((item) =>
                    item.id === editingRow.id ? editValues : item
                  );
                  setData(updated);
                  setEditingRow(null);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={() => setEditingRow(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CallAssistTable;
