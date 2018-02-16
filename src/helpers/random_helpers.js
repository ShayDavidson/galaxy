export function randomFloat(min = 0, max = 1, rndFunc) {
  rndFunc = rndFunc || Math.random;
  return rndFunc() * (max - min) + min;
}

export function randomInteger(min = 0, max = 1, rndFunc) {
  rndFunc = rndFunc || Math.random;
  return Math.floor(randomFloat(min, max, rndFunc));
}

export function randomBoolean(rndFunc) {
  return rndFunc() > 0.5;
}

export function randomString(rndFunc) {
  return rndFunc()
    .toString(36)
    .substring(7);
}

export function randomSample(array, rndFunc) {
  return array[randomInteger(0, array.length, rndFunc)];
}

export function randomByWeights(weights, rndFunc) {
  const keys = Object.keys(weights);
  const sortedKeysByWeights = keys.sort((a, b) => weights[a] - weights[b]);
  const sortedWeights = sortedKeysByWeights.map(val => weights[val]);
  const accumulatedWeights = sortedWeights.reduce((accumulated, currentValue, index) => {
    return [...accumulated, currentValue + (accumulated[index - 1] || 0)];
  }, []);
  const totalWeight = accumulatedWeights[accumulatedWeights.length - 1];
  const randomInt = randomInteger(0, totalWeight, rndFunc);
  const matchingRangeIndex = accumulatedWeights.findIndex(accumulatedWeight => randomInt < accumulatedWeight);
  return sortedKeysByWeights[matchingRangeIndex];
}

export function seededRandom(seed) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export class RNG {
  constructor(seed) {
    this.seed = seed;
    this.counter = 0;
    this._random = this.random.bind(this);
  }

  reset() {
    this.counter = 0;
  }

  random() {
    return this.randomWithCounter(this.counter++);
  }

  randomWithCounter(counter) {
    return seededRandom(this.seed + counter);
  }

  randomFloat(min, max) {
    return randomFloat(min, max, this._random);
  }

  randomInteger(min, max) {
    return randomInteger(min, max, this._random);
  }

  randomBoolean() {
    return randomBoolean(this._random);
  }

  randomString() {
    return randomString(this._random);
  }

  randomSample(array) {
    return randomSample(array, this._random);
  }

  randomByWeights(weights) {
    return randomByWeights(weights, this._random);
  }
}
