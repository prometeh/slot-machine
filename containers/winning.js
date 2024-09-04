import * as PIXI from "pixi.js";
import assets from "../assets.json";
import { SPRITE_HEIGHT, SPRITE_WIDTH } from "./reel";

const WinningContainer = (reelContainer) => {
  const winningContainer = new PIXI.Container();
  const frames = [];
  for (const spriteName of assets.animations.WinsweepBox) {
    const texture = PIXI.Texture.from(spriteName);
    frames.push(texture);
  }
  const animation = new PIXI.AnimatedSprite(frames);

  animation.width = SPRITE_WIDTH;
  animation.height = SPRITE_HEIGHT;
  animation.position.set(0, SPRITE_HEIGHT / 2 + 20);

  animation.alpha = 0.3;
  animation.animationSpeed = 0.4;

  winningContainer.addChild(animation);
  const ticker = new PIXI.Ticker();
  ticker.autoStart = true;
  ticker.add(() => {
    if (!reelContainer.isSpinning && reelContainer.data.winning) {
      animation.play();
      animation.visible = true;
    } else {
      animation.stop();
      animation.visible = false;
    }
  });

  return winningContainer;
};

export default WinningContainer;
