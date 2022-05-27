import Name from './Name';

/**
 * this function should inherit the human function
 */
function Child(props) {
    this.name = new Name(props);
    this.birthday = new Date(props.birthday);
}