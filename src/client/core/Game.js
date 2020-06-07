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
      0,
      this.getCanvasWidth(),
      this.getCanvasHeight()
    );
  }

  setCameraPosition() {
    this.camera.x =
      this.fighter.x - this.camera.width / 2 + this.fighter.width / 2;
    this.camera.y =
      this.fighter.y - (this.camera.height - this.fighter.height - 30);
  }

  getCanvasHeight() {
    return this.canvas.height / this.devicePixelRatio;
  }

  getCanvasWidth() {
    return this.canvas.width / this.devicePixelRatio;
  }

  async load() {
    this.fighter = await Fighter.load(this.context);
    this.fighter.x = this.getCanvasWidth() / 2 - this.fighter.width / 2;
    this.fighter.y = this.getCanvasHeight() - this.fighter.height - 30;

    this.world = await World.load(this.context);

    this.setCameraPosition();
  }

  start() {
    if (!this.fighter || !this.world) {
      throw new Error("You must first call the load method");
    }

    const step = () => {
      this.draw();
      this.update();

      requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }

  /**
   * Update state
   */
  update() {
    this.setCameraPosition();
    this.fighter.update();
  }

  /**
   * Take state and draw
   */
  draw() {
    this.context.save();
    this.context.clearRect(0, 0, canvas.width, canvas.height);

    this.context.translate(-this.camera.x, -this.camera.y);

    this.world.draw();
    this.fighter.draw();

    this.context.restore();
  }
}
