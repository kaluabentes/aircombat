import ImageLoader from "../core/ImageLoader";
import {
  ARROW_LEFT_KEY,
  ARROW_UP_KEY,
  ARROW_RIGHT_KEY,
  ARROW_DOWN_KEY,
} from "../config/settings";

import fighterImage from "../assets/images/fighter.png";

const NORMAL_HEIGHT = 175;
const NORMAL_SOURCE_HEIGHT = 350;
const NORMAL_SOURCE_Y = 0;
const BOOST_HEIGHT = 205;
const BOOST_SOURCE_HEIGHT = 381;
const BOOST_SOURCE_Y = 350;

export default class Fighter {
  constructor(context, image) {
    this.context = context;
    this.image = image;

    this.width = 123;
    this.height = NORMAL_HEIGHT;
    this.sourceWidth = 245;
    this.sourceHeight = NORMAL_SOURCE_HEIGHT;
    this.sourceY = NORMAL_SOURCE_Y;
    this.normalVelocity = 5;
    this.boostVelocity = 10;

    this.frames = [0, 245, 490];
    this.frame = 0;

    this.moveLeft = false;
    this.moveUp = false;
    this.moveRight = false;

    this.addEventListeners();
  }

  /**
   * Factory method
   * @param {CanvasRenderingContext2D} context
   */
  static async load(context) {
    const image = await ImageLoader.load(fighterImage);

    return new Fighter(context, image);
  }

  update() {
    this.y += -this.normalVelocity;

    if (this.moveLeft) {
      this.x -= this.boostVelocity;
    }

    if (this.moveUp) {
      this.y -= this.boostVelocity;
    }

    if (this.moveRight) {
      this.x += this.boostVelocity;
    }

    if (this.moveUp) {
      this.sourceY = BOOST_SOURCE_Y;
      this.sourceHeight = BOOST_SOURCE_HEIGHT;
      this.height = BOOST_HEIGHT;
    } else {
      this.sourceHeight = NORMAL_SOURCE_HEIGHT;
      this.sourceY = NORMAL_SOURCE_Y;
      this.height = NORMAL_HEIGHT;
    }

    this.frame = (this.frame + 1) % this.frames.length;
  }

  draw() {
    this.context.drawImage(
      this.image,
      this.frames[this.frame],
      this.sourceY,
      this.sourceWidth,
      this.sourceHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  addEventListeners() {
    window.addEventListener("keydown", (event) => {
      switch (event.keyCode) {
        case ARROW_LEFT_KEY: {
          this.moveLeft = true;
          break;
        }
        case ARROW_UP_KEY: {
          this.moveUp = true;
          break;
        }
        case ARROW_RIGHT_KEY: {
          this.moveRight = true;
          break;
        }
      }
    });

    window.addEventListener("keyup", (event) => {
      switch (event.keyCode) {
        case ARROW_LEFT_KEY: {
          this.moveLeft = false;
          break;
        }
        case ARROW_UP_KEY: {
          this.moveUp = false;
          break;
        }
        case ARROW_RIGHT_KEY: {
          this.moveRight = false;
          break;
        }
      }
    });
  }
}
