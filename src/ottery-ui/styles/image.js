export const image = {
  largeProfile: "150px",
  mediumProfile: "80px",
  smallProfile: "44px",
};

export function updateImage(name, size) {
  if (image.hasOwnProperty(name)) {
    image[name] = size;
  }
}
export const styles = {
  clickable: {
    minHeight: image.mediumProfile,
  },
};
