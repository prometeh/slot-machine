import { SPRITE_HEIGHT } from "../containers/reel";
import * as PIXI from "pixi.js";

const ReelAnimation = (reelContainer, startSpin) => {
  if (!reelContainer.data.isSpinning) {
    startSpinnning(reelContainer, startSpin);
  } else if (reelContainer.data.isSpinning) {
    if (reelContainer.data.duration === 0 && reelContainer.data.offset === 0) {
      reelContainer.data.duration = randomInt(0, 1);

      reelContainer.data.offset = randomInt(10, 21);
    }

    keepSpinning(reelContainer);
  }
};

const startSpinnning = (reelContainer, startSpin) => {
  reelContainer.data.isSpinning = startSpin;
};

const keepSpinning = (reelContainer) => {
  for (const sprite of reelContainer.children) {
    sprite.y += reelContainer.data.offset;
    if (sprite.y >= SPRITE_HEIGHT * 6) {
      reelContainer.children.unshift(reelContainer.children.pop());
      sprite.y = -(SPRITE_HEIGHT * 4) - SPRITE_HEIGHT;
    }
  }
};

let result;
export const landgracefully = (reelContainer) => {
  let initYpos = -(SPRITE_HEIGHT * 4);
  for (const sprite of reelContainer.children) {
    sprite.y = initYpos;
    initYpos += sprite.height;
  }

  if (!result) {
    result = [];
  }

  const ticker = new PIXI.Ticker();

  ticker.autoStart = true;
};

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export default ReelAnimation;
