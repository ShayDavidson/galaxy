import { polarToCartesian, cartesianToPolar, lerp, inverseLerp } from "helpers/math_helpers";

export function buildGalaxy(
  rng,
  { starCount, spiralArms, spiralCurve, armSpread, armPull, coreDensity, starTypesWeights, starSizeWeights }
) {
  const systems = [];
  const galaxy = systems;
  const galaxyRoughRadius = 10000;

  for (let i = 0; i < starCount; i++) {
    let { r, t } = polarUniformLogarithmicSpiral(rng, spiralCurve, coreDensity);
    t = 2 * Math.PI * (rng.randomInteger(1, spiralArms + 1) / spiralArms) + t;
    let { x, y } = polarToCartesian(r, t);
    const varPolar = polarExpCircleDistribution(rng, armPull);
    const varCartesian = polarToCartesian(varPolar.r * armSpread, varPolar.t);
    x = (x + varCartesian.x) * galaxyRoughRadius;
    y = (y + varCartesian.y) * galaxyRoughRadius;
    const backToPolar = cartesianToPolar(x, y);
    systems.push({
      pos: {
        x,
        y,
        r: backToPolar.r,
        t: backToPolar.t
      },
      type: rng.randomByWeights(
        intepolatedWeights(
          starTypesWeights.min,
          starTypesWeights.max,
          starTypesWeights.ease,
          0,
          galaxyRoughRadius,
          backToPolar.r
        )
      ),
      size: rng.randomByWeights(
        intepolatedWeights(
          starSizeWeights.min,
          starSizeWeights.max,
          starSizeWeights.ease,
          0,
          galaxyRoughRadius,
          backToPolar.r
        )
      ),
      id: rng.randomString()
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
