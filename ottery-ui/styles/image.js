export const image = {
  largeProfile: 150,
  mediumProfile: 80,
  smallProfile: 44,
};

export function updateImage(name, size) {
  if (image.hasOwnProperty(name)) {
    image[name] = size;
  }
}
