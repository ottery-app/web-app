/**
 * this is a parent prototype for all humans
 * it includes a name and all the methods that are generic to all humans
 */
function Human(props={}) {
    this.name = props.name;
    this.age = props.age;
}