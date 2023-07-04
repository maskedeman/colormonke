export function getPalette(pixelData, iterations) {
  if (pixelData.length === 0) {
    return [];
  }
  console.log("GetPalette invoked");
  if (iterations === 0) {
    return getAverageColor(pixelData);
  }

  const highestChannel = getBroadestChannel(pixelData);
  const [lowerPart, upperPart] = splitData(pixelData, highestChannel);
  return [
    ...getPalette(lowerPart, iterations - 1),
    ...getPalette(upperPart, iterations - 1),
  ];
}

function splitData(pixelData, channelId) {
  const values = getChannelValues(pixelData, channelId).sort();
  const mid = Math.ceil(values.length / 2);
  const median = values[mid];
  const lower = new Uint8ClampedArray(4 * mid);
  const upper = new Uint8ClampedArray(pixelData.length - lower.length);
  let lowerIx = 0,
    upperIx = 0;
  for (let pixelIx = 0; pixelIx < pixelData.length; pixelIx += 4) {
    const isLower =
      pixelData[pixelIx + channelId] < median || upperIx >= upper.length;
    const target = isLower ? lower : upper;
    const targetIx = isLower ? lowerIx : upperIx;
    for (let channelId = 0; channelId < 4; channelId++) {
      target[targetIx + channelId] = pixelData[pixelIx + channelId];
    }
    isLower ? (lowerIx += 4) : (upperIx += 4);
  }
  return [lower, upper];
}

function getChannelValues(pixelData, channelId) {
  const values = new Uint8ClampedArray(pixelData.length / 4);
  for (let vix = 0, ix = channelId; ix < pixelData.length; vix++, ix += 4) {
    values[vix] = pixelData[ix];
  }
  return values;
}

function getBroadestChannel(pixelData) {
  const min = Array(3).fill(255);
  const max = Array(3).fill(0);
  for (let channelId = 0; channelId < 4; channelId++) {
    for (let ix = channelId; ix < pixelData.length; ix += 4) {
      const val = pixelData[ix];
      if (val < min[channelId]) {
        min[channelId] = val;
      }
      if (val > max[channelId]) {
        max[channelId] = val;
      }
    }
  }
  const ranges = max.map((upper, i) => upper - min[i]);
  return ranges.reduce(
    (maxIx, range, i) => (range > ranges[maxIx] ? i : maxIx),
    0
  );
}

function getAverageColor(pixelData) {
  const sums = [0, 0, 0, 0];
  for (let i = 0; i < pixelData.length; i += 4) {
    for (let j = 0; j < 4; j++) {
      sums[j] += pixelData[i + j];
    }
  }
  const numberOfPixels = pixelData.length / 4;
  return sums.map((v) => Math.round(v / numberOfPixels));
}
