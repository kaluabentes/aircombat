import planeSprite from "./assets/sprites/fighter-plane.png";

const planeSourceWidth = 245;
const planeSourcHeight = 350;
const planeSourceY = 0;
const planeWidth = 245;
const planeHeight = 350;

let frames = [0, 245, 490];
let frame = 0;
let context;
let planeImage;
let canvas;

function drawPlane() {
  const planeX = canvas.width * 0.5 - planeWidth * 0.5;
  const planeY = canvas.height - planeHeight - 30;

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
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  canvas.width = window.innerWidth * 2;
  canvas.height = window.innerHeight * 2;

  planeImage = new Image();
  planeImage.setAttribute("src", planeSprite);
  planeImage.addEventListener("load", () => {
    start();
  });
}

document.addEventListener("DOMContentLoaded", main);
