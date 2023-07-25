export function capitalizeFirstLetter(string) {
    const [firstLetter, ...rest] = string;
    return firstLetter.toUpperCase() + rest.join('');
}