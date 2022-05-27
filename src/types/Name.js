/**
 * this is a class for the name of a person
 * it includes the name and prototypes for getting the name and setting the name
 */
function Name(props) {
    //if the input is a string then split it into first, middle, and last using spaces
    if (typeof props === "string") {
        let split = props.split(" ");
        //if there are only two words then the middle name is empty
        if (split.length === 2) {
            this.first = split[0];
            this.last = split[1];
        }
        //if there are three words then the middle name is the second word
        else if (split.length === 3) {
            this.first = split[0];
            this.middle = split[1];
            this.last = split[2];
        }
    }

    //if the input is an object then set the first, middle, and last
    if (typeof props === "object") {
        this.first = props.first;
        this.middle = props.middle;
        this.last = props.last;
    }
}

/**
 * this is used to set the firstname
 */
Name.prototype.setFirst = function(first) {
    //check that it is a string otherwise throw an error
    if (typeof first !== "string") {
        throw new Error("first name must be a string");
    }
    //set the first name
    this.first = first;
}

/**
 * this is the setter for the middle name
 * it will throw an error if the middle name is not a string
 */
Name.prototype.setMiddle = function(middle) {
    //check that it is a string otherwise throw an error
    if (typeof middle !== "string") {
        throw new Error("middle name must be a string");
    }
    //set the middle name
    this.middle = middle;
}

/**
 * this is the setter for the last name
 */
Name.prototype.setLast = function(last) {
    //check that it is a string otherwise throw an error
    if (typeof last !== "string") {
        throw new Error("last name must be a string");
    }
    //set the last name
    this.last = last;
}

/**
 * this is the getter for the full name not including middle names
 */
Name.prototype.full = function() {
    return this.first + " " + this.last;
}

/**
 * this is the getter for the full name including middle names
 * it will return the full name if there is no middle name
 */
Name.prototype.fullM = function() {
    if (this.middle) {
        return this.first + " " + this.middle + " " + this.last;
    } else {
        return this.full();
    }
}

/**
 * this is for getting the abreviated name
 */
Name.prototype.abr = function() {
    return this.first[0] + ". " + this.last;
}

/**
 * this is for the toString function so that name can be used in JSON.stringify
 */
Name.prototype.toString = function() {
    return JSON.stringify(this);
}

export default Name;