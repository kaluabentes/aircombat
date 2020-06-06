import planeSprite from "./assets/sprites/fighter-plane.png";

const canvasMaxWidth = 1280;

const planeSourceWidth = 245;
const planeSourcHeight = 350;
const planeSourceY = 0;
const planeWidth = 123;
const planeHeight = 175;

let frames = [0, 245, 490];
let frame = 0;
let context;
let planeImage;
let canvas;
let devicePixelRatio;

function drawPlane() {
  const planeX = (canvas.width * 0.5) / devicePixelRatio - planeWidth / 2;
  const planeY = canvas.height / devicePixelRatio - planeHeight - 30;

  context.drawImage(
    planeImage,
    frames[frame],
    planeSourceY,
    planeSourceWidth,
    planeSourcHeight,
    planeX,
    planeY,
    planeWidth,
    planeHeight
  );

  frame = (frame + 1) % frames.length;
}

function update() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawPlane();
}

function start() {
  const step = () => {
    update();

    requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

function main() {
  devicePixelRatio = window.devicePixelRatio || 1;
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  const canvasWidth =
    window.innerWidth > canvasMaxWidth ? canvasMaxWidth : window.innerWidth;
  canvas.width = canvasWidth * devicePixelRatio;
  canvas.height = window.innerHeight * devicePixelRatio;

  context.scale(devicePixelRatio, devicePixelRatio);

  planeImage = new Image();
  planeImage.setAttribute("src", planeSprite);
  planeImage.addEventListener("load", () => {
    start();
  });
}

document.addEventListener("DOMContentLoaded", main);
