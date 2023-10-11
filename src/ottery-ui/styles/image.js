export const image = {
    largeProfile: "150px",
    mediumProfile: "80px",
    smallProfile: "44px",
    extraSmallProfile: "30px"
}

export function updateImage(name, size) {
    image[name] = size; 
}