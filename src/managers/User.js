import axios from "axios";

import {
    backend,
    setDefaults,
    userStates,
} from "./Manager";

/**
 * this is the user manager the state is the manager of the current state that the user is in
 * 
 */
function User(props) {
    /*
    props = {
        token: token,
        state: state,
    }
    */

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
                `${backend}/user/register`,
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
            console.error(err);
        }
    }

    //i dont feel like this belongs here...
    let login = async (username, password, success, error) => {
        try {
            const res = await axios.post(
                `${backend}/user/login`,
                {
                    username:username,
                    password:password
                }
            );
            success(res);
        } catch (err) {
            error(err);
            console.error(err);
        }
    }

    let loadUser = async (success, error) => {
        try {
            const res = await axios.post(
                `${backend}/user/load`,
                {
                    token: localStorage.getItem("token"),
                }
            );
            success(res);
        } catch (err) {
            error(err);
            console.error(err);
        }
    }

    let addState = async (state, success, error) => {
        try {
            const res = await axios.post(
                `${backend}/user/addState`,
                {
                    token:props.token,
                    state:state
                }
            );
            success(res);
        } catch (err) {
            error(err);
            console.error(err);
        }
    }

    if (props === undefined) {
        return {
            newUser:newUser,
            login:login,
            loadUser:loadUser,
        }
    } else if (typeof props.token === "string" && typeof props.state === "string")  {
        let returns = {
            addState:addState,
        }
        
        let state = userStates.get(props.state);
        Object.entries(state(props.token)).forEach(([key, value]) => {
            returns[key] = value;
        });

        return returns;
    }
}

export default User;