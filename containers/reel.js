import * as PIXI from "pixi.js";

export const SPRITE_WIDTH = 250;
export const SPRITE_HEIGHT = 225;

const Reel = (x, y) => {
  const reelContainer = new PIXI.Container();

  const sprites = [
    "Low1.png",
    "Low2.png",
    "Low3.png",
    "Low4.png",

    "Coin.png",
    "Bonus.png",
    "Wild.png",

    "High1.png",
    "High2.png",
    "High3.png",
    "High4.png",
  ];

  let initYpos = -(SPRITE_HEIGHT * 4);

  for (const spriteName of sprites) {
    const sprite = new PIXI.Sprite(PIXI.Texture.from(spriteName));
    sprite.name = spriteName;
    sprite.anchor.set(0.5);
    sprite.x = SPRITE_WIDTH / 2;
    sprite.y = initYpos;
    initYpos += sprite.height;

    sprite.scale.set(0.9);

    reelContainer.addChild(sprite);
  }

  reelContainer.x = x;
  reelContainer.y = y;

  return reelContainer;
};

export default Reel;
