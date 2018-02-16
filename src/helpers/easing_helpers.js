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

export function inBack(t) {
  const s = 1.70158;
  return t * t * ((s + 1) * t - s);
}

export function outBack(t) {
  const s = 1.70158;
  return --t * t * ((s + 1) * t + s) + 1;
}

export function inOutBack(t) {
  const s = 1.70158 * 1.525;
  if ((t *= 2) < 1) return 0.5 * (t * t * ((s + 1) * t - s));
  return 0.5 * ((t -= 2) * t * ((s + 1) * t + s) + 2);
}

export function inElastic(t) {
  let s = 0.1;
  let a = 0.1;
  const p = 0.4;
  if (t === 0) return 0;
  if (t === 1) return 1;
  if (!a || a < 1) {
    a = 1;
    s = p / 4;
  } else {
    s = p * Math.asin(1 / a) / (2 * Math.PI);
  }
  return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
}

export function outElastic(t) {
  let s = 0.1;
  let a = 0.1;
  const p = 0.4;
  if (t === 0) return 0;
  if (t === 1) return 1;
  if (!a || a < 1) {
    a = 1;
    s = p / 4;
  } else {
    s = p * Math.asin(1 / a) / (2 * Math.PI);
  }
  return a * Math.pow(2, -10 * t) * Math.sin((t - s) * (2 * Math.PI) / p) + 1;
}

export function inOutElastic(t) {
  let s = 0.1;
  let a = 0.1;
  const p = 0.4;
  if (t === 0) return 0;
  if (t === 1) return 1;
  if (!a || a < 1) {
    a = 1;
    s = p / 4;
  } else {
    s = p * Math.asin(1 / a) / (2 * Math.PI);
  }
  if ((t *= 2) < 1) return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
  return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p) * 0.5 + 1;
}

export function inBounce(t) {
  return 1 - outBounce(1 - t);
}

export function outBounce(t) {
  if (t < 1 / 2.75) {
    return 7.5625 * t * t;
  } else if (t < 2 / 2.75) {
    return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
  } else if (t < 2.5 / 2.75) {
    return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
  } else {
    return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
  }
}

export function inOutBounce(t) {
  if (t < 0.5) return inBounce(t * 2) * 0.5;
  return outBounce(t * 2 - 1) * 0.5 + 0.5;
}
