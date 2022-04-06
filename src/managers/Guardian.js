function Guardian(token) {
    let getChildren = async (success, error) =>{
        success([
            {
                name: "Benjamin Lewis",
                pfp: undefined
            },
            {
                name: "Jonathan Lewis",
                pfp: undefined
            },
            {
                name: "Alexander Lewis",
                pfp: undefined
            },
            {
                name: "Brody Bond",
                pfp: undefined
            }
        ]);
    }

    /**
     * these are the public functions that can be used
     */
    return {
        state: "guardian",
        getChildren: getChildren,
    }
}

export default Guardian;