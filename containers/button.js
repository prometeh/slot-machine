import * as PIXI from "pixi.js";

const Button = (handleClick) => {
  const buttonContainer = new PIXI.Container();

  const button = new PIXI.Graphics();
  button.beginFill(0xe020f6, 1);
  button.drawRoundedRect(0, 0, 175, 40, 3);
  button.pivot.set(button.width / 2, button.height / 2);
  buttonContainer.addChild(button);

  const labelStyle = new PIXI.TextStyle({
    fill: "#FFFFFF",
    fontWeight: 600,
  });
  const label = new PIXI.Text("Spin!", labelStyle);

  label.anchor.set(0.5);
  buttonContainer.addChild(label);

  buttonContainer.on("click", handleClick);
  buttonContainer.eventMode = "static";

  return buttonContainer;
};

export default Button;
