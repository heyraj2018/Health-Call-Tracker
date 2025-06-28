import React, { useEffect, useState } from "react";

const visibleColumns = [
  "created_by", "issued_date", "customer_name", "policy_number",
  "regn_no", "mobile_number", "make", "model", "company",
  "Health_Call_Status", "Last Updated by User", "Update_History"
];

const statusOptions = [
  "New", "Call_Back_Asked", "Quote_Sent", "Did_Not_Pick",
  "Health_Policy_Issued", "Has_Policy_Already"
];

const formatColumnName = (name: string) =>
  name.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const CallAssistTable = () => {
  const [data, setData] = useState<any[]>([]);
  const [modalData, setModalData] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/api/calls")
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const handleRowDoubleClick = (row: any) => {
    setModalData({ ...row });
    setShowModal(true);
  };

  const handleModalSave = () => {
    // TODO: POST to backend to update
    setShowModal(false);
  };

  const filteredData = data.filter(
    (d) => !statusFilter || d.Health_Call_Status === statusFilter
  );

  const pagedData = filteredData.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Call Assist</h2>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div>
          <label className="font-medium mr-2">Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(0);
            }}
            className="border px-3 py-1 rounded"
          >
            <option value="">All</option>
            {statusOptions.map((s) => (
              <option key={s} value={s}>{formatColumnName(s)}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-medium mr-2">Rows per page:</label>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(0);
            }}
            className="border px-3 py-1 rounded"
          >
            {[5, 10, 25, 50].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">S. No.</th>
              {visibleColumns.map((col) => (
                <th key={col} className="border px-2 py-1 text-left">
                  {formatColumnName(col)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pagedData.map((row, idx) => (
              <tr
                key={row.id}
                onDoubleClick={() => handleRowDoubleClick(row)}
                className="hover:bg-gray-50 cursor-pointer"
              >
                <td className="border px-2 py-1">{page * pageSize + idx + 1}</td>
                {visibleColumns.map((col) => (
                  <td key={col} className="border px-2 py-1">
                    {String(row[col] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between mt-3 items-center">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            className="px-3 py-1 bg-gray-200 rounded"
            disabled={page === 0}
          >
            Previous
          </button>
          <span>Page {page + 1}</span>
          <button
            onClick={() => setPage((p) => (page + 1 < Math.ceil(filteredData.length / pageSize) ? p + 1 : p))}
            className="px-3 py-1 bg-gray-200 rounded"
            disabled={(page + 1) * pageSize >= filteredData.length}
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 w-full max-w-lg rounded shadow-lg">
            <h3 className="text-lg font-bold mb-4">Update Call Status</h3>

            {[
              "created_by", "issued_date", "customer_name", "policy_number",
              "regn_no", "mobile_number", "make", "model", "company"
            ].map((field) => (
              <div key={field} className="mb-2">
                <label className="block text-sm font-medium">{formatColumnName(field)}</label>
                <input
                  type="text"
                  value={modalData[field]}
                  disabled
                  className="w-full border px-2 py-1 bg-gray-100 rounded"
                />
              </div>
            ))}

            <div className="mb-2">
              <label className="block text-sm font-medium">Health Call Status</label>
              <select
                value={modalData.Health_Call_Status || ""}
                onChange={(e) =>
                  setModalData({ ...modalData, Health_Call_Status: e.target.value })
                }
                className="w-full border px-2 py-1 rounded"
              >
                <option value="">Select status</option>
                {statusOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {formatColumnName(opt)}
                  </option>
                ))}
              </select>
            </div>

            {modalData.Health_Call_Status === "Call_Back_Asked" && (
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <label className="block text-sm font-medium">Call Back Date</label>
                  <input
                    type="date"
                    value={modalData.callback_date || ""}
                    onChange={(e) =>
                      setModalData({ ...modalData, callback_date: e.target.value })
                    }
                    className="w-full border px-2 py-1 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Call Back Time</label>
                  <input
                    type="time"
                    value={modalData.callback_time || ""}
                    onChange={(e) =>
                      setModalData({ ...modalData, callback_time: e.target.value })
                    }
                    className="w-full border px-2 py-1 rounded"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end mt-4 gap-2">
              <button
                onClick={handleModalSave}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
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
