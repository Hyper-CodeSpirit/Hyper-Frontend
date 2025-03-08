import { Route } from "react-router-dom";
import Homepage from "../pages/homepage/Homepage";
import LoginPage from "../pages/authentication/login/Login";
import RegisterPage from "../pages/authentication/register/Register";
import { AuthorizeLogin } from "../middleware/Auth";
import InspectionsPage from "../pages/dashboardPages/inspections/Inspections";
import ClientsPage from "../pages/dashboardPages/clients/Clients";


function PublicRoutes() {
    return (
        <>
            <Route path="/" element={<Homepage />} />
            <Route path="/inspection" element={<InspectionsPage />} />
            <Route path="/client" element={<ClientsPage />} />
            <Route path="/login" element={<AuthorizeLogin><LoginPage /></AuthorizeLogin>} />
            <Route path="/register" element={<AuthorizeLogin><RegisterPage /></AuthorizeLogin>} />
            </>
    );
}

export default PublicRoutes;
