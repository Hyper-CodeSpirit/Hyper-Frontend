import { Route } from "react-router-dom";
import Homepage from "../pages/homepage/Homepage";
import LoginPage from "../pages/authentication/login/Login";
import RegisterPage from "../pages/authentication/register/Register";


function PublicRoutes() {
    return (
        <>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            </>
    );
}

export default PublicRoutes;
