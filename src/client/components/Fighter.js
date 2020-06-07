import ImageLoader from "../core/ImageLoader";
import {
  ARROW_LEFT_KEY,
  ARROW_UP_KEY,
  ARROW_RIGHT_KEY,
  ARROW_DOWN_KEY,
} from "../config/settings";

import fighterImage from "../assets/images/fighter.png";

export default class Fighter {
  constructor(context, image, coords) {
    this.context = context;
    this.image = image;

    this.width = 123;
    this.height = 175;
    this.sourceWidth = 245;
    this.sourcHeight = 350;
    this.sourceY = 0;

    this.frames = [0, 245, 490];
    this.frame = 0;

    this.moveLeft = false;
    this.moveUp = false;
    this.moveRight = false;
    this.moveDown = false;

    this.addEventListeners();
  }

  setX(x) {
    this.x = x;
  }

  setY(y) {
    this.y = y;
  }

  /**
   * Factory method
   * @param {CanvasRenderingContext2D} context
   */
  static async load(context) {
    const image = await ImageLoader.load(fighterImage);

    return new Fighter(context, image);
  }

  draw() {
    if (this.moveLeft) {
      this.x -= 2;
    }

    if (this.moveRight) {
      this.x += 2;
    }

    this.context.drawImage(
      this.image,
      this.frames[this.frame],
      this.sourceY,
      this.sourceWidth,
      this.sourcHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );

    this.frame = (this.frame + 1) % this.frames.length;
  }

  addEventListeners() {
    window.addEventListener("keydown", (event) => {
      switch (event.keyCode) {
        case ARROW_LEFT_KEY: {
          this.moveLeft = true;
        }
        case ARROW_UP_KEY: {
          this.moveUp = true;
        }
        case ARROW_RIGHT_KEY: {
          this.moveRight = true;
        }
        case ARROW_DOWN_KEY: {
          this.moveDown = true;
        }
      }
    });

    window.addEventListener("keyup", (event) => {
      switch (event.keyCode) {
        case ARROW_LEFT_KEY: {
          this.moveLeft = false;
        }
        case ARROW_UP_KEY: {
          this.moveUp = false;
        }
        case ARROW_RIGHT_KEY: {
          this.moveRight = false;
        }
        case ARROW_DOWN_KEY: {
          this.moveDown = false;
        }
      }
    });
  }
}
