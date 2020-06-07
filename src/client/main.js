import "babel-polyfill";

import Game from "./core/Game";

async function main() {
  try {
    const game = new Game();
    await game.load();
    game.start();
  } catch (error) {
    console.log(error);
  }
}

document.addEventListener("DOMContentLoaded", main);
