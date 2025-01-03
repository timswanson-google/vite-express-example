import "./style.css";

interface ColorResponse {
  red: number;
  green: number;
  blue: number;
}

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>Vite+Express Prototype</h1>
    <div id="color-box"></div>
    <button id="color-button" type="button">Change Color</button>
      <form class="radio-group">
        <label><input type="radio" name="colorVariant" value="" checked>Random</label>
        <label><input type="radio" name="colorVariant" value="red">Red</label>
        <label><input type="radio" name="colorVariant" value="blue">Blue</label>
        <label><input type="radio" name="colorVariant" value="green">Green</label>
        <label><input type="radio" name="colorVariant" value="gray">Gray</label>
    </form>
`;

const button = document.querySelector<HTMLButtonElement>("#color-button")!;
const box = document.querySelector<HTMLButtonElement>("#color-box")!;
setColor();

button.addEventListener("click", setColor);

async function setColor() {
  const selectedRadioButton = document.querySelector(
    'input[name="colorVariant"]:checked',
  ) as HTMLInputElement;
  const variant = selectedRadioButton.value;
  box.style.backgroundColor = await getRandomColor(variant);
}

async function getRandomColor(variant: string) {
  const url = new URL("/color", window.location.origin);
  if (variant) {
    url.searchParams.append("variant", variant);
  }

  const response = await fetch(url);
  const { red, green, blue } = (await response.json()) as ColorResponse;
  return `rgb(${red}, ${green}, ${blue})`;
}
