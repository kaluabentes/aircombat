import ImageLoader from "../core/ImageLoader";

import worldImage from "../assets/images/world.png";

export const WORLD_WIDTH = 11926;
export const WORLD_HEIGHT = 8325;

export default class World {
  constructor(context, image) {
    this.context = context;
    this.image = image;

    this.width = WORLD_WIDTH;
    this.height = WORLD_HEIGHT;
  }

  /**
   * Factory method
   * @param {CanvasRenderingContext2D} context
   */
  static async load(context) {
    const image = await ImageLoader.load(worldImage);

    return new World(context, image);
  }

  draw() {
    this.context.drawImage(
      this.image,
      0,
      0,
      this.width,
      this.height,
      0,
      0,
      this.width / this.context.devicePixelRatio,
      this.height / this.context.devicePixelRatio
    );
  }
}
