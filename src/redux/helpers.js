import { xpForLevel, levelForXp } from "functions";

export const setGoalAndSkills = (skills, primary, secondary) => {
  const level = skills[primary + "Level"];
  const xp = skills[primary + "Xp"];
  const goalLevel = level + 1;

  let _secondary = {};

  secondary.forEach(s => {
    _secondary[s + "Level"] = skills[s + "Level"];
    _secondary[s + "Xp"] = skills[s + "Xp"];
  });

  return {
    level,
    xp,
    goalLevel,
    goalXp: xpForLevel(goalLevel),

    ..._secondary
  };
};

export const updateStartGoalHelper = (name, value) => {
  return {
    ...(name === "goalLevel" || name === "goalXp"
      ? name === "goalLevel"
        ? {
            goalXp: xpForLevel(value)
          }
        : { goalLevel: levelForXp(value) }
      : {}),
    ...(name === "level" || name === "xp"
      ? name === "level"
        ? {
            xp: xpForLevel(value)
          }
        : {
            level: levelForXp(value)
          }
      : {})
  };
};
