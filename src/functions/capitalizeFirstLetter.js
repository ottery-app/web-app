export function capitalizeFirstLetter(string) {
    try {
        const [firstLetter, ...rest] = string;
        return firstLetter.toUpperCase() + rest.join('');
    } catch (e) {
        return string;
    }
}