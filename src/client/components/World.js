import ImageLoader from "../core/ImageLoader";

import worldImage from "../assets/images/world.png";

export const WORLD_WIDTH = 6000;
export const WORLD_HEIGHT = 4163;

export default class World {
  constructor(context, image) {
    this.context = context;
    this.image = image;

    this.sourceWidth = WORLD_WIDTH;
    this.sourceHeight = WORLD_HEIGHT;
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
      this.sourceWidth,
      this.sourceHeight,
      0,
      0,
      this.sourceWidth / this.context.devicePixelRatio,
      this.sourceHeight / this.context.devicePixelRatio
    );
  }
}
