import { Route } from "react-router-dom";
import Homepage from "../pages/homepage/Homepage";

function PublicRoutes() {
    return (
        <>
            <Route path="/home" element={<Homepage />} />
        </>
    );
}

export default PublicRoutes;
