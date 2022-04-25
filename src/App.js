import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useContext } from "react";

import Login from "./components/login/Login";
import Regester from "./components/login/Register";

import GuardianHome from "./components/guardian/GuardianHome";

import AuthContext from "./auth/authContext";

import Wrapper from "./components/Wrapper.js";

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
    <div id="app">
      <BrowserRouter>
          <Routes>
            <Route index element={<Login />} />
            <Route path="register" element={<Regester />} />
            
            <Route path="guardian" element={<Wrapper state="guardian"/>}>
              <Route index element={<GuardianHome />} />
            </Route>

            <Route path="director" element={<Wrapper state="director" />}>
            </Route>

            <Route path="organization" element={<Wrapper state="orginization" />} >
            </Route>

            <Route path="*" element={<div>missing</div>} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;