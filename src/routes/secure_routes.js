import { Route } from "react-router-dom";
import OverviewPage from "../pages/dashboardPages/overview/Overview";
import AppoinmentPage from "../pages/dashboardPages/appoinment/Appoinment";
import InspectionsPage from "../pages/dashboardPages/inspections/Inspections";
import ClientsPage from "../pages/dashboardPages/clients/Clients";
import VehiclesPage from "../pages/dashboardPages/vehicles/Vehicles";
import ServicesPage from "../pages/dashboardPages/services/Services";
import DashboardPage from "../pages/dashboard/Dashboard";
import InvoicesPage from "../pages/dashboardPages/invoices/Invoices";
import { AuthorizeAdmin } from "../middleware/Auth";

function SecureRoutes() {
    return (
        <>
          <Route path="/dashboard/*" element={<AuthorizeAdmin><DashboardPage /></AuthorizeAdmin>} >
            <Route index element={<OverviewPage/>} />
            <Route path="appoinment" element={<AppoinmentPage/>} />
            <Route path="inspections" element={<InspectionsPage/>} />
            <Route path="invoices" element={<InvoicesPage/>} />
            <Route path="clients" element={<ClientsPage/>} />
            <Route path="vehicles" element={<VehiclesPage/>} />
            <Route path="services" element={<ServicesPage/>} />
          </Route>
        </>
    );
}

export default SecureRoutes;
