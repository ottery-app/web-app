import "../css/Nav.css";

import { BiHome } from "react-icons/bi";
import { BiCalendar } from "react-icons/bi";
import { BiUser } from "react-icons/bi";
import { BiArrowFromBottom } from "react-icons/bi";
import { BiArrowToBottom } from "react-icons/bi";

import { Outlet, Link } from "react-router-dom";

/**
 * this is the navigation component it is displayed as a footer.
 */
function Nav({state}) {
    return (
        <>
            <footer id="nav" className="b1 c3">
                <span>
                    <Link to={`info/user`}>
                        <BiUser className="t8" />
                    </Link>
                </span>
                <span>
                    <Link to={`/${state}/dropoff`}>    
                        <BiArrowFromBottom />
                    </Link>
                </span>
                <span>
                    <Link to={`/${state}`}>
                        <BiHome className="t8" />
                    </Link>
                </span>
                <span className="">
                    <Link to={`/${state}/pickup`}>
                        <BiArrowToBottom />
                    </Link>
                </span>
                <span>
                    <Link to={`/${state}/calander`}>
                        <BiCalendar className="t8" />
                    </Link>
                </span>
            </footer>
            <Outlet />
        </>
    );
}

export default Nav;