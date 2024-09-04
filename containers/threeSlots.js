import * as PIXI from "pixi.js";
import Reel, { SPRITE_HEIGHT } from "./reel";
import WinningContainer from "./winning";

const ThreeSlots = () => {
  const threeSlots = new PIXI.Container();
  const maskRect = new PIXI.Graphics();
  const slotOne = Reel(0, 20);
  slotOne.name = "first";
  const slotTwo = Reel(slotOne.width + 20, 20);
  slotTwo.name = "second";
  const slotThree = Reel(slotOne.width + slotTwo.width + 40, 20);
  slotThree.name = "third";

  const winningContainerOne = WinningContainer(slotOne);
  const winningContainerTwo = WinningContainer(slotTwo);
  winningContainerTwo.position = slotTwo.position;
  winningContainerTwo.height -= 20;

  const winningContainerThree = WinningContainer(slotThree);
  winningContainerThree.position = slotThree.position;
  winningContainerThree.height -= 20;

  threeSlots.addChild(slotOne, slotTwo, slotThree, maskRect);
  threeSlots.addChildAt(winningContainerOne, 4);
  threeSlots.addChildAt(winningContainerTwo, 5);
  threeSlots.addChildAt(winningContainerThree, 6);

  maskRect.beginFill(0x000, 1);
  maskRect.drawRect(0, 0, threeSlots.width, SPRITE_HEIGHT * 2);

  threeSlots.mask = maskRect;

  return threeSlots;
};
export default ThreeSlots;
