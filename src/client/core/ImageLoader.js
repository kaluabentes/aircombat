export default class ImageLoader {
  constructor() {
    this.images = [];
  }

  load(imagePath) {
    const imagePromisified = new Promise((resolve) => {
      const image = new Image();

      image.setAttribute("src", imagePath);
      image.addEventListener("load", () => {
        resolve(image);
      });
    });

    this.images.push(imagePromisified);

    return imagePromisified;
  }

  async ready(callback) {
    await Promise.all(this.images);
    callback();
  }
}
