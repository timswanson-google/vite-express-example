import type { Request, Response } from "express";

type ColorVariant = "red" | "green" | "blue" | "gray";

interface ColorParams {
  variant?: ColorVariant;
}

interface ColorResponse {
  red: number;
  green: number;
  blue: number;
}

export function getRandomColor(
  request: Request<{}, {}, {}, ColorParams>,
  response: Response<ColorResponse>,
) {
  const { variant } = request.query;

  let red = randomInt();
  let blue = randomInt();
  let green = randomInt();

  switch (variant) {
    case "red": {
      red = 0xff;
      break;
    }
    case "green": {
      green = 0xff;
      break;
    }
    case "blue": {
      blue = 0xff;
      break;
    }
    case "gray": {
      blue = red;
      green = red;
      break;
    }
  }

  response.json({ red, green, blue });
}

/** Random 8-bit integer */
function randomInt() {
  return Math.floor(Math.random() * 0xff);
}
