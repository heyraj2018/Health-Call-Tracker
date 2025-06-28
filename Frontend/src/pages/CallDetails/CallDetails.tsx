import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";

export default function CallDetails() {
  return (
    <>
      <PageMeta
        title="Call Assist Dashboard"
        description="This is the Call Assist page for Template"
      />
      <PageBreadcrumb pageTitle="Call Assist" />
      <div className="space-y-6">
        <div
          className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]`}
        >
          {/* Card Header */}
          <div className="px-6 py-5">
            <div className="grid gap-2 sm:grid-cols-2 md:gap-3 lg:grid-cols-4">
              {/* <!-- Metric Item Start --> */}
              <div className="rounded-2xl border border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-white/[0.03] md:p-3">
                <div className="flex items-center justify-center h-10 bg-gray-100 rounded-xl dark:bg-gray-800 cursor-pointer text:gray-800 dark:text-white/90">
                  New Calls
                </div>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-white/[0.03] md:p-3">
                <div className="flex items-center justify-center h-10 bg-gray-100 rounded-xl dark:bg-gray-800 cursor-pointer text:gray-800 dark:text-white/90">
                  Follow Ups
                </div>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-white/[0.03] md:p-3">
                <div className="flex items-center justify-center h-10 bg-gray-100 rounded-xl dark:bg-gray-800 cursor-pointer text:gray-800 dark:text-white/90">
                  Call Backs
                </div>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-white/[0.03] md:p-3">
                <div className="flex items-center justify-center h-10 bg-gray-100 rounded-xl dark:bg-gray-800 cursor-pointer text:gray-800 dark:text-white/90">
                  Notifications
                </div>
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
            <div className="space-y-6">
              <BasicTableOne />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
