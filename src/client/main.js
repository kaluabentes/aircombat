import "babel-polyfill";

import ImageLoader from "./core/ImageLoader";

import fighterImagePath from "./assets/images/fighter.png";
import mapImagePath from "./assets/images/map.png";

const canvasMaxWidth = 1280;

const fighterSourceWidth = 245;
const fighterSourcHeight = 350;
const fighterSourceY = 0;
const fighterWidth = 123;
const fighterHeight = 175;

let frames = [0, 245, 490];
let frame = 0;
let context;
let fighterImage;
let mapImage;
let canvas;
let devicePixelRatio;

function drawMap() {
  context.drawImage(
    mapImage,
    canvas.height / devicePixelRatio,
    0,
    6000,
    2081,
    0,
    0,
    6000 / devicePixelRatio,
    2081 / devicePixelRatio
  );
}

function drawfighter() {
  const fighterX = (canvas.width * 0.5) / devicePixelRatio - fighterWidth / 2;
  const fighterY = canvas.height / devicePixelRatio - fighterHeight - 30;

  context.drawImage(
    fighterImage,
    frames[frame],
    fighterSourceY,
    fighterSourceWidth,
    fighterSourcHeight,
    fighterX,
    fighterY,
    fighterWidth,
    fighterHeight
  );

  frame = (frame + 1) % frames.length;
}

function update() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawMap();
  drawfighter();
}

function start() {
  const step = () => {
    update();

    requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

async function main() {
  devicePixelRatio = window.devicePixelRatio || 1;
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  const canvasWidth =
    window.innerWidth > canvasMaxWidth ? canvasMaxWidth : window.innerWidth;
  canvas.width = canvasWidth * devicePixelRatio;
  canvas.height = window.innerHeight * devicePixelRatio;

  context.scale(devicePixelRatio, devicePixelRatio);

  const imageLoader = new ImageLoader();

  fighterImage = await imageLoader.load(fighterImagePath);
  mapImage = await imageLoader.load(mapImagePath);

  await imageLoader.ready(() => {
    start();
  });
}

document.addEventListener("DOMContentLoaded", main);
