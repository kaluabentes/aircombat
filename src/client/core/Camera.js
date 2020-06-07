export default class Camera {
  constructor(x, y, width, height, leftEdge, topEdge, rightEdge, bottomEdge) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.leftEdge = leftEdge || leftEdge + width * 0.25;
    this.topEdge = topEdge || topEdge + height * 0.25;
    this.rightEdge = rightEdge || rightEdge + width * 0.75;
    this.bottomEdge = bottomEdge || bottomEdge + height * 0.75;
  }
}
