import { polarToCartesian, cartesianToPolar, lerp, inverseLerp } from "helpers/math_helpers";
import { RNG } from "helpers/random_helpers";

export function buildGalaxy(
  { rngSeed, starCount, galaxyRadius, spiralArms, spiralCurve, armSpread, armDensity, coreDensity },
  starSizeWeights,
  starTypesWeights
) {
  const rng = new RNG(rngSeed);
  const systems = [];
  const galaxy = systems;

  for (let i = 0; i < starCount; i++) {
    let { r, t } = polarUniformLogarithmicSpiral(rng, spiralCurve, coreDensity);
    t = 2 * Math.PI * (rng.randomInteger(1, spiralArms + 1) / spiralArms) + t;
    let { x, y } = polarToCartesian(r, t);
    const varPolar = polarExpCircleDistribution(rng, armDensity);
    const varCartesian = polarToCartesian(varPolar.r * armSpread, varPolar.t);
    x = (x + varCartesian.x) * galaxyRadius;
    y = (y + varCartesian.y) * galaxyRadius;
    const backToPolar = cartesianToPolar(x, y);
    systems.push({
      pos: {
        r: backToPolar.r,
        t: backToPolar.t
      },
      type: rng.randomByWeights(
        intepolatedWeights(
          starTypesWeights.min,
          starTypesWeights.max,
          starTypesWeights.ease,
          0,
          galaxyRadius,
          backToPolar.r
        )
      ),
      size: rng.randomByWeights(
        intepolatedWeights(
          starSizeWeights.min,
          starSizeWeights.max,
          starSizeWeights.ease,
          0,
          galaxyRadius,
          backToPolar.r
        )
      )
    });
  }

  return galaxy;
}

function intepolatedWeights(minWeights, maxWeights, ease, min, max, value) {
  return Object.keys(minWeights).reduce((weights, key) => {
    weights[key] = lerp(minWeights[key], maxWeights[key], ease(inverseLerp(min, max, value)));
    return weights;
  }, {});
}

function polarExpCircleDistribution(rng, exp) {
  const u = rng.random() + rng.random();
  const r = u > 1 ? 2 - u : u;
  const t = 2 * Math.PI * rng.random();
  return { r: Math.pow(r, exp), t };
}

function polarUniformLogarithmicSpiral(rng, b, spiralCoreDensity) {
  const maxR = Math.exp(b * Math.PI * 2 * spiralCoreDensity);
  const t = rng.random() * Math.PI * 2 * spiralCoreDensity;
  const r = Math.exp(b * t) / maxR;
  return { r, t };
}
