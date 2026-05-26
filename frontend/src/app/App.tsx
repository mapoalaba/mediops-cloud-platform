import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { AuditLogsPage } from "../features/auditLogs/AuditLogsPage";
import { AppointmentsPage } from "../features/appointments/AppointmentsPage";
import { LoginPage } from "../features/auth/LoginPage";
import { DashboardPage } from "../features/dashboard/DashboardPage";
import { DeploymentsPage } from "../features/deployments/DeploymentsPage";
import { IncidentsPage } from "../features/incidents/IncidentsPage";
import { MonitoringPage } from "../features/monitoring/MonitoringPage";
import { PatientsPage } from "../features/patients/PatientsPage";
import { SecurityPage } from "../features/security/SecurityPage";
import { SimulationsPage } from "../features/simulations/SimulationsPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/incidents" element={<IncidentsPage />} />
          <Route path="/simulations" element={<SimulationsPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/audit-logs" element={<AuditLogsPage />} />
          <Route path="/monitoring" element={<MonitoringPage />} />
          <Route path="/deployments" element={<DeploymentsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
