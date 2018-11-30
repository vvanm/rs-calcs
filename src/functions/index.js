export function calcShopBuyPrice(buyX, base, multiplier) {
  return (base + multiplier * (buyX - 1) + base) / 2;
}

export function round(a, places) {
  if (places === undefined) {
    places = 0;
  }
  if (a === undefined) {
    return "";
  }
  if (a === "") {
    return "";
  }
  if (Number.isNaN(a)) {
    return "";
  }
  return +(Math.round(a + "e+" + places) + "e-" + places);
}

export function shortenN(number, offset) {
  if (Number.isNaN(number) || number === "" || number === undefined) {
    return "";
  }

  const SI_POSTFIXES = ["", "k", "M", "G", "T", "P", "E"];

  number = round(number, 3);

  //shorten big numbers 12345 => 12K
  // what tier? (determines SI prefix)
  var tier = (Math.log10(Math.abs(number)) / 3) | 0;

  //add offset incase we wonna have some control, 2041k instead of 2m
  if (offset !== undefined && tier > 1) {
    tier += offset;
  }

  // if zero, we don't need a prefix
  if (tier === 0) return number;

  // get postfix and determine scale
  var postfix = SI_POSTFIXES[tier];
  var scale = Math.pow(10, tier * 3);

  // scale the number
  var scaled = number / scale;

  // format number and add postfix as suffix
  var formatted = scaled.toFixed(1) + "";

  // remove '.0' case
  if (/\.0$/.test(formatted)) formatted = formatted.substr(0, formatted.length - 2);

  return formatted + postfix;
}

export function isNumber(v, def) {
  if (v === undefined || v === "") {
    return def !== undefined ? def : 0;
  }
  return parseInt(v, 10);
}

export function determineInfoFromXp(startXp, startLevel, xpGained) {
  const endXp = startXp + xpGained;

  let points = 0;
  let endLevel = 0;
  let nextLevel = 0;
  let nextLevelRemaining = 0;
  let nextLevelXp = 0;

  for (let lvl = 1; lvl <= 150; lvl++) {
    points += Math.floor(lvl + 300 * Math.pow(2, lvl / 7));
    const xp = Math.floor(points / 4);

    if (xp > endXp) {
      endLevel = lvl;
      nextLevel = lvl + 1;
      nextLevelRemaining = Math.ceil(xp - endXp);
      nextLevelXp = xp;
      break;
    }
  }

  return {
    startXp,
    startLevel,
    xpGained,
    levelsGained: endLevel - startLevel,
    endXp,
    endLevel,
    nextLevel,
    nextLevelRemaining,
    nextLevelXp
  };
}

export function xpForLevel(level) {
  let xp = 0;
  let points = 0;

  for (let lvl = 1; lvl < level; lvl++) {
    points += Math.floor(lvl + 300 * Math.pow(2, lvl / 7));
    xp = Math.floor(points / 4);
  }

  return xp;
}

export function levelForXp(_xp) {
  let points = 0;

  for (let lvl = 1; lvl <= 150; lvl++) {
    points += Math.floor(lvl + 300 * Math.pow(2, lvl / 7));
    const xp = Math.floor(points / 4);

    if (xp > _xp) {
      return lvl;
    }
  }
}

export function toHHMMSS(s) {
  var sec_num = parseInt(s, 10);
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);
  var seconds = sec_num - hours * 3600 - minutes * 60;

  var hourSeparator = ":";
  var minuteSeparator = ":";

  if (hours === 0) {
    hours = "";
    hourSeparator = "";
  }
  if (minutes < 10 && hours !== 0) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  var time = hours + hourSeparator + minutes + minuteSeparator + seconds;
  return time;
}

export function toTwitchTimestamp(s) {
  var sec_num = parseInt(s, 10);
  var minutes = Math.floor(sec_num / 60);
  var seconds = sec_num - minutes * 60;
  return minutes + "m" + seconds + "s";
}

export function getPlankMakeStats(method, logs) {
  return method === 3
    ? {
        nature: logs * 1,
        astral: logs * 2,
        magicXp: logs * 50
      }
    : {
        nature: 0,
        astral: 0,
        magicXp: 0
      };
}
