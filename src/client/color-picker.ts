import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

interface ColorResponse {
  red: number;
  green: number;
  blue: number;
}

@customElement("color-picker")
export class ColorPickerElement extends LitElement {
  @property({ type: String })
  color = "rgb(255, 255, 255)";

  render() {
    return html`
      <div>
        <h1>Vite+Express Demo</h1>
        <div id="color-box" style="background-color: ${this.color}"></div>
        <button @click=${this.setColor} type="button">Change Color</button>
        <form class="radio-group">
          <label>
            <input type="radio" name="colorVariant" value="" checked />Random
          </label>
          <label>
            <input type="radio" name="colorVariant" value="red" />Red
          </label>
          <label>
            <input type="radio" name="colorVariant" value="blue" />Blue
          </label>
          <label>
            <input type="radio" name="colorVariant" value="green" />Green
          </label>
          <label>
            <input type="radio" name="colorVariant" value="gray" />Gray
          </label>
        </form>
      </div>
    `;
  }

  firstUpdated() {
    this.setColor();
  }

  async setColor() {
    const selectedRadioButton = this.shadowRoot.querySelector(
      'input[name="colorVariant"]:checked',
    ) as HTMLInputElement;
    const variant = selectedRadioButton.value;
    this.color = await getRandomColor(variant);
  }

  static styles = css`
    :host {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }

    #color-box {
      width: 200px;
      height: 200px;
      margin: 20px auto;
      border: 1px solid black;
      border-radius: 5px;
    }

    .radio-group {
      display: flex;
      flex-direction: column;
      border: 1px solid;
      padding: 10px;
      border-radius: 5px;
      margin: 20px auto;
      width: 250px;
    }

    .radio-group label {
      margin: 5px 0;
      display: flex;
      align-items: center;
    }

    .radio-group input[type="radio"] {
      margin-right: 8px;
    }

    button {
      border-radius: 8px;
      border: 1px solid;
      padding: 0.6em 1.2em;
      font-size: 1em;
      font-weight: 500;
      font-family: inherit;
      cursor: pointer;
    }
  `;
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

declare global {
  interface HTMLElementTagNameMap {
    "color-picker": ColorPickerElement;
  }
}
