export default class ImageLoader {
  /**
   * The path of the image to be loaded
   * @param {string} imagePath
   * @returns {Promise<HTMLImageElement>} Image instance promisified
   */
  static load(imagePath) {
    return new Promise((resolve) => {
      const image = new Image();

      image.setAttribute("src", imagePath);
      image.addEventListener("load", () => {
        resolve(image);
      });
    });
  }
}
