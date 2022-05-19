import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useContext } from "react";

import Login from "./components/login/Login";
import Regester from "./components/login/Register";

import GuardianHome from "./components/guardian/GuardianHome";
import GuardianUserProfile from "./components/guardian/GuardianUserProfile";
import GuardianEdit from "./components/guardian/GuardianEdit";

import MakeKid from "./components/make/MakeKid"
import MakeFriend from "./components/make/MakeFriend";
import MakeVehicle from "./components/make/MakeVehicle";

import Kid from "./components/info/Kid";
import User from "./components/info/User";
import Vehicle from "./components/info/Vehicle";

import AuthContext from "./auth/authContext";

import Redirect from "./components/login/Redirect.js";
import Missing from "./components/Missing.js";
import Wrapper from "./components/wrappers/Wrapper.js";

/**
 * Dream big and make it happen.
 */
function App() {
  const authContext = useContext(AuthContext);

  //checks if the user is saved on the local storage
  useEffect(() => {
    authContext.load();
  },[]);

  return (
    <BrowserRouter>
      <Redirect>
        <Wrapper>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Regester />} />
            
            <Route path="guardian">
              <Route index element={<GuardianHome />} />
              <Route path="user" element={<GuardianUserProfile />} />
              <Route path="user/edit" element={<GuardianEdit />} />
              <Route path="create/kids" element={<MakeKid />} />
              <Route path="create/friends" element={<MakeFriend />} />
              <Route path="create/vehicles" element={<MakeVehicle />} />
            </Route>

            <Route path="info">
              <Route path="kid" element={<Kid />} />
              <Route path="user" element={<User />} />
              <Route path="vehicle" element={<Vehicle />} />
            </Route>

            <Route path="director">
            </Route>

            <Route path="*" element={<Missing/>} />
          </Routes>
        </Wrapper>
      </Redirect>
    </BrowserRouter>
  );
}

export default App;