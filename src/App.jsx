import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import RoleSelection from "./pages/RoleSelection";
import Login from "./pages/Login";
import AccessDenied from "./pages/AccessDenied";

import AdminLayout from "./layouts/AdminLayout";
import StudentLayout from "./layouts/StudentLayout";

import RequireRole from "./auth/RequireRole";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminEvents from "./pages/admin/AdminEvents";
//import AdminReports from "./pages/admin/AdminReports";

import StudentDashboard from "./pages/student/StudentDashboard";
import LiveEvents from "./pages/student/LiveEvents";
import Certificates from "./pages/student/Certificates";
import HelpDesk from "./pages/student/HelpDesk";
import AdminEventDetails from "./pages/admin/AdminEventDetails";
import AdminRegistrations from "./pages/admin/AdminRegistrations";
import AdminRegistrationDetails from "./pages/admin/AdminRegistrationDetails";
import AdminAttendance from "./pages/admin/AdminAttendance";
import AdminAttendanceDetails from "./pages/admin/AdminAttendanceDetails";
import AdminFeedback from "./pages/admin/AdminFeedback";
import AdminFeedbackDetails from "./pages/admin/AdminFeedbackDetails";
import AdminCertificates from "./pages/admin/AdminCertificates";
import AdminCertificateDetails from "./pages/admin/AdminCertificateDetails";
import AdminEvidence from "./pages/admin/AdminEvidence";
import AdminEvidenceDetails from "./pages/admin/AdminEvidenceDetails";
import AdminOutcomes from "./pages/admin/AdminOutcomes";
import AdminOutcomeDetails from "./pages/admin/AdminOutcomeDetails";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import ReviewerSnapshot from "./pages/reviewer/ReviewerSnapshot";

import MyRegistrations from "./pages/student/MyRegistrations";
import Attendance from "./pages/student/Attendance";
import Feedback from "./pages/student/Feedback";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Entry */}
        <Route path="/" element={<Login />} />
        <Route path="/select-role" element={<RoleSelection />} />
        <Route path="/access-denied" element={<AccessDenied />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <RequireRole role="admin">
              <AdminLayout />
            </RequireRole>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="events" element={<AdminEvents />} />
          {/*<Route path="reports" element={<AdminReports />} />*/}
          <Route path="events/:eventId" element={<AdminEventDetails />} />
          <Route path="registrations" element={<AdminRegistrations />} />
          <Route path="registrations/:registrationId" element={<AdminRegistrationDetails />} />
          <Route path="attendance" element={<AdminAttendance />} />
          <Route path="attendance/:attendanceId" element={<AdminAttendanceDetails />} />
          <Route path="feedback" element={<AdminFeedback />} />
          <Route path="feedback/:feedbackId" element={<AdminFeedbackDetails />} />
          <Route path="certificates" element={<AdminCertificates />} />
          <Route path="certificates/:certificateBatchId" element={<AdminCertificateDetails />} />
          <Route path="evidence" element={<AdminEvidence />} />
          <Route path="evidence/:evidenceId" element={<AdminEvidenceDetails />} />
          <Route path="outcomes" element={<AdminOutcomes />} />
          <Route path="outcomes/:outcomeId" element={<AdminOutcomeDetails />} />
          <Route path="reports" element={<AdminAnalytics />} />
        </Route>

        {/* Student Routes */}
        <Route
          path="/student"
          element={
            <RequireRole role="student">
              <StudentLayout />
            </RequireRole>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="live-events" element={<LiveEvents />} />
          <Route path="registrations" element={<MyRegistrations />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="feedback" element={<Feedback />} />

          <Route path="certificates" element={<Certificates />} />
          <Route path="help" element={<HelpDesk />} />
        </Route>
        <Route path="/reviewer" element={<ReviewerSnapshot />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
