import "./Manager";

function Child(id) {
    return {
        newChild: (first, middle, last, gender, dob, allergies, specialNeeds, additionalInfo, success, error) => {
            [success, error] = checkNullHandlers(success, error);
    
            let username = JSON.parse(localStorage.getItem("user")).username;
            let token = localStorage.getItem("token");
    
            try {
                const res = await axios.post(
                    `${backend}/newChild`,
                    {
                        username:username,
                        password:token,
                        firstName:first,
                        middleName:middle,
                        lastName:last,
                        gender:gender,
                        date:dob,
                        allergies:allergies,
                        specialNeeds:specialNeeds,
                        additionalInfo:additionalInfo
                    }
                );
                success(res);
            } catch (err) {
                error(err);
            }
        },
    }
}