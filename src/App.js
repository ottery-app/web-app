import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useContext } from "react";

import Login from "./components/login/Login";
import Regester from "./components/login/Register";

import GuardianHome from "./components/guardian/GuardianHome";

import AuthContext from "./auth/authContext";

import Redirect from "./components/login/Redirect.js";

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
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Regester />} />
          
          <Route path="guardian">
            <Route index element={<GuardianHome />} />
          </Route>

          <Route path="director">
          </Route>

          <Route path="organization">
          </Route>

          <Route path="*" element={<div>missing</div>} />
        </Routes>
      </Redirect>
    </BrowserRouter>
  );
}

export default App;