import Camera from "./Camera";

import Fighter from "../components/Fighter";
import World, { WORLD_HEIGHT } from "../components/World";

const CANVAS_MAX_WIDTH = 1280;

export default class Game {
  constructor() {
    this.devicePixelRatio = window.devicePixelRatio || 1;
    this.canvas = document.getElementById("canvas");
    this.context = canvas.getContext("2d");
    this.context.devicePixelRatio = this.devicePixelRatio;

    // Setup canvas
    const canvasWidth =
      window.innerWidth > CANVAS_MAX_WIDTH
        ? CANVAS_MAX_WIDTH
        : window.innerWidth;
    this.canvas.width = canvasWidth * this.devicePixelRatio;
    this.canvas.height = window.innerHeight * this.devicePixelRatio;
    this.context.scale(this.devicePixelRatio, this.devicePixelRatio);

    this.camera = new Camera(
      0,
      -(WORLD_HEIGHT / this.devicePixelRatio) + this.getCanvasHeight(),
      this.getCanvasWidth(),
      this.getCanvasHeight()
    );
  }

  getCanvasHeight() {
    return this.canvas.height / this.devicePixelRatio;
  }

  getCanvasWidth() {
    return this.canvas.width / this.devicePixelRatio;
  }

  async load() {
    this.fighter = await Fighter.load(this.context);
    this.fighter.setX(this.getCanvasWidth() / 2 - this.fighter.width / 2);
    this.fighter.setY(
      -this.camera.y + this.getCanvasHeight() - this.fighter.height - 30
    );

    this.world = await World.load(this.context);
  }

  start() {
    if (!this.fighter || !this.world) {
      throw new Error("You must first call the load method");
    }

    const step = () => {
      this.draw();

      requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }

  draw() {
    this.context.save();
    this.context.clearRect(0, 0, canvas.width, canvas.height);
    this.context.translate(this.camera.x, this.camera.y);

    this.world.draw();
    this.fighter.draw();

    this.context.restore();
  }
}
