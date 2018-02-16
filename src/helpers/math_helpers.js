export function polarToCartesian(r, t) {
  let x = r * Math.cos(t);
  let y = r * Math.sin(t);
  return { x, y };
}

export function cartesianToPolar(x, y) {
  let r = Math.sqrt(x * x + y * y);
  let t = Math.atan2(y, x);
  return { r, t };
}

export function mod(i, n) {
  return (i % n + n) % n;
}

export function lerp(min, max, t) {
  return min * (1 - t) + max * t;
}

export function inverseLerp(min, max, val) {
  return (val - min) / (max - min);
}

export function clamp(min, val, max) {
  return Math.max(min, Math.min(val, max));
}
