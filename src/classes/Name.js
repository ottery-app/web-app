/**
 * this is a class for the name of a person
 * it includes the name and prototypes for getting the name and setting the name
 */
function Name(props={}) {
    this.first = props.first;
    this.middle = props.middle;
    this.last = props.last; 
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