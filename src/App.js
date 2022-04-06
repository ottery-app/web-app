import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

import "./css/colors.css";
import "./css/App.css";

import Login from "./login/Login";
import Missing from "./components/Missing";
import Wrapper from "./components/Wrapper";

import Guardian from "./guardian/Guardian";
import DropOff from "./guardian/DropOff";
import NewChild from "./new/NewChild";

import Director from "./director/Director";

import AuthContext from "./context/auth/authContext";

/**
 * Dream big and make it happen.
 */
function App() {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
  },[]);

  return (
    <div id="app">
      <BrowserRouter>
          <Routes>
            {/*<Route index element={<Navigate to={state} />} />*/}
            <Route index element={<Login />} />
            
            {/*talk to benjamin for a better undersanding of guardian*/}
            <Route path="guardian" element={<Wrapper state="guardian"/>}>
              <Route index element={<Guardian />} />
              <Route path="dropoff" element={<DropOff />} />
              <Route path="pickup" element={"pickup"} />
              <Route path="profile" element={"profile"} />
              <Route path="search" element={"search"} />
              <Route path="calander" element={"calander"} />
              <Route path="newchild" element={<NewChild />} />
            </Route>

            {/*talk to brody for a better undersanding of director*/}
            <Route path="director" element={<Wrapper state="director" />}>
              <Route index element={<Director/>} />
              <Route path="checkin" element={"checkin"} />
              <Route path="checkout" element={"checkout"} />
              <Route path="settings" element={"settings"} />
              <Route path="schedule" element={"schedule"} />
            </Route>

            {/* this is for the view of the orginization and managing classes */}
            <Route path="organization" element={<Wrapper state="orginization" />} >
              <Route index element={"organization"} />
            </Route>

            {/*this is for displaying the following information regardless of guardian, director, or orginization*/}
            <Route path="info" element={<Wrapper state="I dont know yet. Or even which of these should be private" />}>
              <Route path="child" element={"child info"} />
              <Route path="user" element={"user info"} />
              <Route path="car" element={"car info"} />
              <Route path="event" element={"event info"} />
              <Route path="orginization" element={"orginization info"} />
            </Route>

            {/*this is a missing page catch all*/}
            <Route path="*" element={<Missing />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;