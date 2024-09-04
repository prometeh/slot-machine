/*
    Hello and welcome to your 1 523'rd work assignment!

    Today we are going to make a 3 reel slot that starts, spins and stops.
    And if we are lucky enough to land the same symbol on all 3 reels, we win! WOHO!

    * Reels should start, spin and stop on random positions/symbols
    * If all 3 reels stops on the same symbol, play a win celebration.
    * You can use the WinsweepBox[00-25] sequence for win animation.
    * All available symbols can be found within assets.json

    The assignment will be judged with the following points in mind:
    * Creativity
    * Structure
    * Complexity
    * Look'n'feel

    Spritesheets can be created from https://www.codeandweb.com/tp-online
    Example on how to get started with sprites can be found in the run() method.

    If you have any questions, feel free to contact us at devlead@jaderabbitstudio.com
 */

import * as PIXI from "pixi.js";
import ReelAnimation, { landgracefully } from "./animations/reel";
import ThreeSlots from "./containers/threeSlots";
import Button from "./containers/button";

const app = new PIXI.Application({
  width: 800,
  height: 500,
  backgroundColor: 0x1099bb,
  antialias: true,
  transparent: false,
  resolution: 1,
});

window.addEventListener("load", async () => {
  await loadAssets();
  document.body.appendChild(app.view);
  await run();
});

async function loadAssets() {
  const assetPromises = [];
  assetPromises.push(PIXI.Assets.load("assets.json"));
  await Promise.all(assetPromises);
}

async function run() {
  let threeSlots = ThreeSlots();
  let slotOne = threeSlots.children.at(0);
  let slotTwo = threeSlots.children.at(1);
  let slotThree = threeSlots.children.at(2);
  let startSpin = false;

  threeSlots.scale.set(0.7);
  threeSlots.position.set(threeSlots.width / 4, 50);

  let button = Button(() => {
    startSpin = true;

    app.ticker.addOnce(() => {
      for (var i = 0; i < 3; i++) {
        let reelContainer = threeSlots.children.at(i);
        reelContainer.data.winning = false;

        let timer = setInterval(() => {
          reelContainer.data.duration--;

          if (reelContainer.data.duration < 0) {
            clearInterval(timer);
            reelContainer.data.offset = 0;
            reelContainer.data.duration = 0;
            reelContainer.data.isSpinning = false;
            landgracefully(reelContainer);
          }
        }, 1000);
      }
    });
  });

  button.position.set(app.screen.width / 2 - 20, 450);

  app.stage.addChild(threeSlots);

  app.stage.addChild(button);

  app.ticker.add(function () {
    for (var i = 0; i < 3; i++) {
      let container = threeSlots.children.at(i);

      ReelAnimation(container, startSpin);
    }
    if (
      !slotOne.data.isSpinning &&
      !slotTwo.data.isSpinning &&
      !slotThree.data.isSpinning
    ) {
      button.eventMode = "static"; // making the button works only when all the reels have stopped

      if (
        slotOne.children.at(5).name === slotTwo.children.at(5).name &&
        slotOne.children.at(5).name === slotThree.children.at(5).name
      ) {
        for (var i = 0; i < 3; i++) {
          let container = threeSlots.children.at(i);

          container.data.winning = true;
        }
      } else {
        for (var i = 0; i < 3; i++) {
          let container = threeSlots.children.at(i);

          container.data.winning = false;
        }
      }
    } else {
      button.eventMode = "none";
    }
    startSpin = false;
  });
}
