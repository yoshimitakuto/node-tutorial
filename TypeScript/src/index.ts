import saySomething from "./saySomething";

const root: HTMLElement | null = document.getElementById("root");

// インスタンス化
const saySome = new saySomething("Hello Typescript");
saySome.sayText(root);
