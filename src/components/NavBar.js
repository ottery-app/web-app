import Nav from "../ottery-ui/footers/NavBar";
import IconButton from "../ottery-ui/buttons/IconButton";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import paths from "../router/paths";
import { useNavigator } from "../hooks/useNavigator";

export default function NavBar() {
    const sesh = useSelector(store=>store.auth.sesh);
    const navigator = useNavigator();
    const [buttons, setButtons] = useState([]);

    useEffect(()=>{
        if (sesh.state === "guardian") {
            setButtons([
                {
                    icon: "dropoff",
                    path: paths.guardian.dropoff,
                },
                {
                    icon: "home",
                    path: paths.guardian.home,
                },
                {
                    icon: "user",
                    path: paths.user.profile,
                    params: {
                        userId: sesh.userId
                    }
                },
                {
                    icon: "pickup",
                    path: paths.guardian.pickup,
                },
            ]);
        } else if (sesh.state === "caretaker") {
            setButtons([
                {
                    icon: "dropoff",
                    path: paths.caretaker.dropoff,
                },
                {
                    icon: "home",
                    path: paths.caretaker.home,
                },
                {
                    icon: "user",
                    path: paths.user.profile,
                    params: {
                        userId: sesh.userId
                    }
                },
                {
                    icon: "pickup",
                    path: paths.caretaker.pickup,
                },
            ]);
        }
    }, [sesh]);
    
    return (
        <Nav>
            {buttons.map((button, i)=>{
                return (
                    <IconButton
                        key={i}
                        icon={button.icon}
                        onClick={()=>{navigator(button.path, button.params)}}
                    />
                );
            })}
        </Nav>
    );
}