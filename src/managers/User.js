import axios from "axios";

import {
    backend,
    setDefaults,
    userStates,
} from "./Manager";

import Guardian from "./Guardian";

/**
 * this is the user manager the state is the manager of the current state that the user is in
 * 
 */
function User(props) {
    /*
    {
        username: "",
        password: "",
        state: "",
        success: "",
        error: "",
    }
    */

    /**
     * this adds a new state to the user
     * @param {String} state 
     * @param {function} success 
     * @param {function} error 
     */
    let addState = async (state, success, error) => {
        [success, error] = setDefaults(success, error);
        try {
            const res = await axios.post(
                `${backend}/addState`,
                {
                    username:props.username,
                    password:props.password,
                    state:state
                }
            );
            success(res);
        } catch (err) {
            error(err);
        }
    }

    /**
     * this is usesd to generate a new user
     * @param {String} email 
     * @param {String} username 
     * @param {String} password 
     * @param {String} firstName 
     * @param {String} middleName 
     * @param {String} lastName 
     * @param {String} gender 
     * @param {String} date 
     * @param {String} country 
     * @param {String} address 
     * @param {String} city 
     * @param {String} state 
     * @param {String} zip 
     * @param {String} phone 
     * @param {function} success 
     * @param {function} error 
     */
    let newUser = async (email, username, password, firstName, middleName, lastName, gender, date, country, address, city, state, zip, phone, success, error) => {
        [success, error] = setDefaults(success, error);
        try {
            const res = await axios.post(
                `${backend}/register`,
                {
                    email:email,
                    username:username,
                    password:password,
                    firstName:firstName,
                    middleName:middleName,
                    lastName:lastName,
                    gender:gender,
                    date:date,
                    country:country,
                    address:address,
                    city:city,
                    state:state,
                    zip:zip,
                    phone:phone
                }
            );
            success(res)
        } catch (err) {
            error(err);
        }
    }

    //i dont feel like this belongs here...
    let login = async (username, password, success, error) => {
        try {
            const res = await axios.post(
                `${backend}/login`,
                {
                    username:username,
                    password:password
                }
            );
            success(res);
        } catch (err) {
            error(err);
        }
    }

    if (typeof props.username === "string" && typeof props.password === "string" && typeof props.state === "string")  {
        let returns = {
            addState:addState,
        }
        
        let state = userStates.get(props.state);
        state = state(props.username, props.password);
        Object.entries(state).forEach(([key, value]) => {
            returns[key] = value;
        });

        console.log(returns);
        return returns;
    } else if (typeof props.username === "string" && typeof props.password === "string") {
        return {
            addState:addState,
        }
    } else {
        return {
            newUser:newUser,
            login:login,
        }
    }
}

export default User;