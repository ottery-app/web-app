import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { AuthGuard } from '../guards/AuthGuard';
import paths from './paths';
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import Website from '../features/website/Website';
import Validate from '../features/auth/Validate';
import NotFound from './NotFound';
import User from '../features/user/profile/User';
import NewChild from '../features/child/NewChild';
import Wrap from "../components/Wrap";
import Home from '../components/Home';
import NewEvent from '../features/event/newEvent/NewEvent';
import { EventSignUp } from '../features/event/signUp/EventSignUp';
import { DropOffGuardian } from '../features/tempzone/dropoff/guardian/DropOffGuardian';
import { DropOffCaretaker } from '../features/tempzone/dropoff/caretaker/DropOffCaretaker';
import { PickUpGuardian } from "../features/tempzone/pickup/guardian/PickUpGuardian";
import {PickUpCaretaker} from "../features/tempzone/pickup/caretaker/PickUpCaretaker";
import { Child } from '../features/child/Child';
import { EventDash } from '../features/event/EventDash';
import { EventInfo } from '../features/event/EventInfo';
import {Notifications} from "../features/notifications/Notifications";
import { Chat } from '../features/chat/Chat';
import { Messages } from '../features/chat/Messages';
import { useAuthClient } from '../features/auth/useAuthClient';
import { AwaitLoad } from '../guards/AwaitLoad';

//this is the router that is used to map the contents of the cite
const router = createBrowserRouter([
  //WEBSITE WEBSITE WEBSITE WEBSITE WEBSITE WEBSITE WEBSITE WEB
  {
    path: paths.website.home,
    element: <Website />,
  },
  //AUTH AUTH AUTH AUTH AUTH AUTH AUTH AUTH AUTH AUTH AUTH AUTH
  {
    path: paths.auth.register,
    element:  <AuthGuard notLoggedin><Register/></AuthGuard>,
  },
  {
    path: paths.auth.login,
    element: <AuthGuard notLoggedin><Login /></AuthGuard>,
  },
  {
    path: paths.auth.validate,
    element: <AuthGuard loggedin><Validate /></AuthGuard>
  },
  //SOCAL SOCAL SOCAL SOCAL SOCAL SOCAL SOCAL SOCAL SOCAL SOCAL
  {
    path: paths.social.notifications,
    element: <AuthGuard loggedin activated>
                <Wrap title="Notifications">
                  <Notifications/>
                </Wrap>
            </AuthGuard>
  },
  {
    path: paths.social.chat,
    element: <AuthGuard loggedin activated>
              <Wrap title="Chat">
                <Chat/>
              </Wrap>
            </AuthGuard>
  },
  {
    path: paths.social.messages,
    element: <AuthGuard loggedin activated>
                <Wrap title="Messages">
                  <Messages />
                </Wrap>
            </AuthGuard>
  },
  //CARETAKER CARETAKER CARETAKER CARETAKER CARETAKER CARETAKER
  {
    path: paths.caretaker.home,
    element: <AuthGuard loggedin activated caretaker>
              <Wrap>
                <Home/>
              </Wrap>
            </AuthGuard>
  },
  // {
  //   path: paths.caretaker.orgs,
  //   element: <AuthGuard loggedin activated caretaker>
  //             <Wrap title="Events & Orgs">
  //               <EventsAndOrgs/>
  //             </Wrap>
  //           </AuthGuard>
  // },
  {
    path: paths.caretaker.dropoff,
    element: <AuthGuard loggedin activated caretaker>
              <Wrap title="Drop Off">
                <DropOffCaretaker />
              </Wrap>
            </AuthGuard>
  },
  {
    path: paths.caretaker.pickup,
    element: <AuthGuard loggedin activated caretaker>
              <Wrap title="Pick Up">
                <PickUpCaretaker />
              </Wrap>
            </AuthGuard>
  },
  //GUARDIAN GUARDIAN GUARDIAN GUARDIAN GUARDIAN GUARDIAN GUARD
  {
    path: paths.guardian.home,
    element: <AuthGuard loggedin activated guardian>
                <Wrap>
                  <Home/>
                </Wrap>
            </AuthGuard>
  },
  {
    path: paths.guardian.dropoff,
    element: <AuthGuard loggedin activated guardian>
              <Wrap title="Drop Off">
                <DropOffGuardian />
              </Wrap>
            </AuthGuard>
  },
  {
    path: paths.guardian.pickup,
    element: <AuthGuard loggedin activated guardian>
              <Wrap title="Pick Up">
                <PickUpGuardian />
              </Wrap>
            </AuthGuard>
  },
  //CHILD CHILD CHILD CHILD CHILD CHILD CHILD CHILD CHILD CHILD
  {
    path: paths.child.new,
    element:<AuthGuard loggedin activated>
              <Wrap title="New Child">
                <NewChild/>
              </Wrap>
            </AuthGuard>
  },
  {
    path: paths.child.profile,
    element: <AuthGuard loggedin activated>
              <Wrap title="Child">
                <Child />
              </Wrap>
            </AuthGuard>
    
  },
  //USER USER USER USER USER USER USER USER USER USER USER USER
  {
    path: paths.user.profile,
    element: <AuthGuard loggedin activated>
              <Wrap title="User Profile">
                <User/>
              </Wrap>
            </AuthGuard>
  },
  //EVENT EVENT EVENT EVENT EVENT EVENT EVENT EVENT EVENT EVENT
  {
    path: paths.event.new,
    element: <AuthGuard loggedin activated>
              <Wrap title="New Event">
                <NewEvent />
              </Wrap>
            </AuthGuard>
  },
  {
    path: paths.event.info,
    element: <AuthGuard>
              <Wrap title="Event Info">
                <EventInfo />
              </Wrap>
            </AuthGuard>
  },
  {
    path: paths.event.dash,
    element: <AuthGuard loggedin activated>
              <Wrap title="Event Dash">
                <EventDash />
              </Wrap>
            </AuthGuard>
  },
  {
    path: paths.event.signup,
    element: <AuthGuard loggedin activated>
              <Wrap title="Sign Up">
                <EventSignUp />
              </Wrap>
            </AuthGuard>
  },
  //404 404 404 404 404 404 404 404 404 404 404 404 404 404 404
  {
    path: "*",
    element: <NotFound/>
  }
]);

//router yea
function Router() {
  const {useLoad} = useAuthClient();
  const {status} = useLoad();

  return (
    <AwaitLoad status={status}>
      <RouterProvider router={router} />
    </AwaitLoad>
  );
}

export default Router;
