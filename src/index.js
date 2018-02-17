import { polarToCartesian, inverseLerp, lerp } from "helpers/math_helpers";
import { buildGalaxy } from "galaxy_builder";
import * as easing from "helpers/easing_helpers";

let config = {
  rngSeed: 1000,
  galaxyRadius: 10000,
  starCount: 5000,
  spiralArms: 3,
  spiralCurve: 0.3,
  coreDensity: 1.3,
  armSpread: 0.9,
  armDensity: 3.75,
  fluctuations: 1,
  coreIsFaster: true,
  baseSlug: 5000,
  slugByRadius: 5000,
  slugEasing: "easeInQuart",
  spaceColor: "#000000",
  zoom: 0.75
};

let playing = true;

let stars = [];
let lastTimestamp = Date.now();

const mainCanvas = document.getElementById("main-canvas");
const mainCanvasContext = mainCanvas.getContext("2d");

document.getElementById("play").addEventListener("click", () => (playing = true));
document.getElementById("pause").addEventListener("click", () => (playing = false));
document.getElementById("reset").addEventListener("click", () => updateStars());

function updateInputs() {
  Array.from(document.getElementsByTagName("select")).forEach(element => {
    Object.keys(easing).forEach(key => {
      const option = document.createElement("option");
      option.text = key;
      element.add(option);
    });
  });

  Object.keys(config).forEach(key => {
    const element = document.getElementById(key);
    if (element.type === "checkbox") {
      element.checked = config[key];
    } else {
      element.value = config[key];
    }
  });
}

function updateStars() {
  stars = buildGalaxy(config);
}

function animateStars(dt) {
  stars = stars.map(star => {
    const r = star.pos.r;
    const t = star.pos.t;
    const minInverseLerp = config.coreIsFaster ? 0 : config.galaxyRadius;
    const maxInverseLerp = config.coreIsFaster ? config.galaxyRadius : 0;
    return {
      ...star,
      pos: {
        r: r + lerp(-config.fluctuations, config.fluctuations, Math.random()),
        t:
          t +
          dt /
            (config.baseSlug +
              config.slugByRadius *
                easing[config.slugEasing](
                  inverseLerp(minInverseLerp, maxInverseLerp, Math.min(config.galaxyRadius, r))
                ))
      }
    };
  });
}

function render() {
  mainCanvasContext.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
  stars.forEach(star => renderStar(star, mainCanvasContext));
}

function animate() {
  const now = Date.now();
  const dt = now - lastTimestamp;
  if (playing) {
    animateStars(dt);
    render();
  }
  lastTimestamp = now;
  requestAnimationFrame(animate);
}

function subscribeToInputChanges() {
  Array.from(document.getElementsByTagName("input"))
    .concat(Array.from(document.getElementsByTagName("select")))
    .forEach(element => {
      element.addEventListener("change", ev => {
        document.getElementById("scene").style.backgroundColor = config.spaceColor;
        if (ev.target.type === "checkbox") {
          config[ev.target.id] = ev.target.checked;
        } else if (ev.target.type === "number") {
          config[ev.target.id] = parseFloat(ev.target.value);
        } else {
          config[ev.target.id] = ev.target.value;
        }

        if (ev.target.dataset.rerender) {
          updateStars();
          render();
        }
      });
    });
}

function renderStar(star, context) {
  let { x, y } = star.pos;
  if (x === undefined && y === undefined) {
    const cartesian = polarToCartesian(star.pos.r, star.pos.t);
    x = cartesian.x;
    y = cartesian.y;
  }
  const xInverseLerpValue = inverseLerp(-config.galaxyRadius / config.zoom, config.galaxyRadius / config.zoom, x);
  const yInverseLerpValue = inverseLerp(-config.galaxyRadius / config.zoom, config.galaxyRadius / config.zoom, y);
  x = 800 * xInverseLerpValue * window.devicePixelRatio;
  y = 800 * yInverseLerpValue * window.devicePixelRatio;
  // const size = STAR_SIZE_MAPPINGS[star.size] * window.devicePixelRatio;
  // const color = STAR_COLOR_MAPPINGS[star.type];
  const size = 1;
  const color = "#fff";
  context.fillStyle = color;
  context.fillRect(x - size / 2, y - size / 2, size, size);
}

updateInputs();
updateStars();
render();
subscribeToInputChanges();
requestAnimationFrame(animate);

//
//   starTypesWeights: {
//     ease: easeOutCubic,
//     min: {
//       blue: 100,
//       blueWhite: 200,
//       white: 1000,
//       yellowWhite: 500,
//       yellow: 1000,
//       lightOrange: 2000,
//       orangeRed: 2000,
//       red: 3
//     },
//     max: {
//       blue: 500,
//       blueWhite: 3000,
//       white: 2000,
//       yellowWhite: 120,
//       yellow: 10,
//       lightOrange: 10,
//       orangeRed: 10,
//       red: 2
//     }
//   },
//   starSizeWeights: {
//     ease: linear,
//     min: {
//       hypergiant: 10,
//       supergiant: 5,
//       giant: 10,
//       standard: 100,
//       dwarf: 10
//     },
//     max: {
//       hypergiant: 10,
//       supergiant: 20,
//       giant: 5,
//       standard: 50,
//       dwarf: 100
//     }
//   }
// };
