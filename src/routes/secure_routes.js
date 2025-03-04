import { Route } from "react-router-dom";
import DashboardPage from "../pages/dashbard/Dashboard";
import OverviewPage from "../pages/dashboardPages/overview/Overview";
import AppoinmentPage from "../pages/dashboardPages/appoinment/Appoinment";
import InspectionsPage from "../pages/dashboardPages/inspections/Inspections";
import ClientsPage from "../pages/dashboardPages/clients/Clients";
import VehiclesPage from "../pages/dashboardPages/vehicles/Vehicles";
import ServicesPage from "../pages/dashboardPages/services/Services";

function SecureRoutes() {
    return (
        <>
          <Route path="/dashboard/*" element={<DashboardPage />} >
            <Route index element={<OverviewPage/>} />
            <Route path="appoinment" element={<AppoinmentPage/>} />
            <Route path="inspections" element={<InspectionsPage/>} />
            <Route path="clients" element={<ClientsPage/>} />
            <Route path="vehicles" element={<VehiclesPage/>} />
            <Route path="services" element={<ServicesPage/>} />
          </Route>
        </>
    );
}

export default SecureRoutes;
