import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import NotFound from "./pages/OtherPage/NotFound";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import CallDetails from "./pages/CallDetails/CallDetails";
import ExcelUpload from "./pages/ExcelUpload/ExcelUpload"; // ✅ new import
import CallAssistTable from './components/telecalling/CallAssistTable';
import SignUp from "./pages/AuthPages/SignUp";


export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />
            <Route path="/call-details" element={<CallDetails />} />
            <Route path="/upload-excel" element={<ExcelUpload />} /> {/* ✅ New route */}
            <Route path="/call-assist" element={<CallAssistTable />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
