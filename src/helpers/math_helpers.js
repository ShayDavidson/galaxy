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

export function rotationMatrix(roll, yaw, pitch) {
  let cosa = Math.cos(yaw);
  let sina = Math.sin(yaw);

  let cosb = Math.cos(pitch);
  let sinb = Math.sin(pitch);

  let cosc = Math.cos(roll);
  let sinc = Math.sin(roll);

  let Axx = cosa * cosb;
  let Axy = cosa * sinb * sinc - sina * cosc;
  let Axz = cosa * sinb * cosc + sina * sinc;

  let Ayx = sina * cosb;
  let Ayy = sina * sinb * sinc + cosa * cosc;
  let Ayz = sina * sinb * cosc - cosa * sinc;

  let Azx = -sinb;
  let Azy = cosb * sinc;
  let Azz = cosb * cosc;

  return { Axx, Axy, Axz, Ayx, Ayy, Ayz, Azx, Azy, Azz };
}

export function rotate({ x: px, y: py, z: pz }, { Axx, Axy, Axz, Ayx, Ayy, Ayz, Azx, Azy, Azz }) {
  return { x: Axx * px + Axy * py + Axz * pz, y: Ayx * px + Ayy * py + Ayz * pz, z: Azx * px + Azy * py + Azz * pz };
}
