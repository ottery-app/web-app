export default function capitalize(string) {
    const words = string.split(" ");
    return words.map((word) => { 
        if (word) {
            return word[0].toUpperCase() + word.substring(1); 
        }
    }).join(" ");
}