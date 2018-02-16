// no easing, no acceleration
export function linear(t) {
  return t;
}

// accelerating from zero velocity
export function easeInQuad(t) {
  return t * t;
}

// decelerating to zero velocity
export function easeOutQuad(t) {
  return t * (2 - t);
}

// acceleration until halfway, then deceleration
export function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

// accelerating from zero velocity
export function easeInCubic(t) {
  return t * t * t;
}

// decelerating to zero velocity
export function easeOutCubic(t) {
  return --t * t * t + 1;
}

// acceleration until halfway, then deceleration
export function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

// accelerating from zero velocity
export function easeInQuart(t) {
  return t * t * t * t;
}

// decelerating to zero velocity
export function easeOutQuart(t) {
  return 1 - --t * t * t * t;
}

// acceleration until halfway, then deceleration
export function easeInOutQuart(t) {
  return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
}

// accelerating from zero velocity
export function easeInQuint(t) {
  return t * t * t * t * t;
}

// decelerating to zero velocity
export function easeOutQuint(t) {
  return 1 + --t * t * t * t * t;
}

// acceleration until halfway, then deceleration
export function easeInOutQuint(t) {
  return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
}

export function inSine(t) {
  return 1 - Math.cos(t * Math.PI / 2);
}

export function outSine(t) {
  return Math.sin(t * Math.PI / 2);
}

export function inOutSine(t) {
  return 0.5 * (1 - Math.cos(Math.PI * t));
}

export function inExpo(t) {
  return t === 0 ? 0 : Math.pow(1024, t - 1);
}

export function outExpo(t) {
  return t === 1 ? t : 1 - Math.pow(2, t * -10);
}

export function inOutExpo(t) {
  if (t === 0) return 0;
  if (t === 1) return 1;
  if ((t *= 2) < 1) return 0.5 * Math.pow(1024, t - 1);
  return 0.5 * (-Math.pow(2, (t - 1) * -10) + 2);
}

export function inCirc(t) {
  return 1 - Math.sqrt(1 - t * t);
}

export function outCirc(t) {
  return Math.sqrt(1 - --t * t);
}

export function inOutCirc(t) {
  t *= 2;
  if (t < 1) return (Math.sqrt(1 - t * t) - 1) * -0.5;
  return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
}
