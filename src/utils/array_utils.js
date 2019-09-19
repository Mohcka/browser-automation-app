// Shuffle an array through recursion
exports.getShuffleArray = arr => {
  if (arr.length === 1) {
    return arr;
  }
  const rand = Math.floor(Math.random() * arr.length);
  return [arr[rand], ...getShuffleArray(arr.filter((_, i) => i != rand))];
};

/**
 *  This will will create an array of n number of sub arrays that was split
 *  from the orginal.
 * @param {Array}   a           The array to split into chunks
 * @param {Number}  n          The amount of chunks to split the array into
 * @param {Boolean} balanced  Determines whether the chunks are balanced
 */
exports.chunkify = (a, n, balanced = true) => {
  if (n < 2) return [a];

  var len = a.length,
    out = [],
    i = 0,
    size;

  if (len % n === 0) {
    size = Math.floor(len / n);
    while (i < len) {
      out.push(a.slice(i, (i += size)));
    }
  } else if (balanced) {
    while (i < len) {
      size = Math.ceil((len - i) / n--);
      out.push(a.slice(i, (i += size)));
    }
  } else {
    n--;
    size = Math.floor(len / n);
    if (len % size === 0) size--;
    while (i < size * n) {
      out.push(a.slice(i, (i += size)));
    }
    out.push(a.slice(size * n));
  }

  return out;
};
