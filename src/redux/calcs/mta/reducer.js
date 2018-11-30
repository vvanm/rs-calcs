import produce from "immer";

import * as TYPES from "./types";

const initialState = {
  xpTelegrab: 43,
  xpAlch: 65,
  xpB2P: 25,

  teleCurrentP: "",
  gravCurrentP: "",
  alchCurrentP: "",
  enchantCurrentP: "",
  enchantMultiplier: 1,
  enchantLevel: 5,
  telePointsPerMaze: 3.6,
  teleLawsPerMaze: 8.3,
  teleSecondsPerMaze: 50,
  alchAlchsPerCycle: 10,
  alchCycleDuration: 42.2,
  alchPointsPerAlch: 0.3,
  gravSecondsPerInvent: 10,
  gravFruitsPerInvent: 22,
  gravFruitsPerPoint: 16,
  pointTypes: [
    { id: "tele", label: "Telekinetic" },
    {
      id: "grav",
      label: "Graveyard"
    },

    { id: "enchant", label: "Enchant" },
    { id: "alch", label: "Alchemist" }
  ],
  enchantLevels: [
    {
      value: 1,
      label: "Sapphire",
      points: 1,
      exp: 13
    },
    {
      value: 2,
      label: "Emerald",
      points: 2,
      exp: 28
    },

    {
      value: 3,
      label: "Ruby",
      points: 3,
      exp: 44
    },

    {
      value: 4,
      label: "Diamond",
      points: 4,
      exp: 50
    },

    {
      value: 5,
      label: "Dstone",
      points: 5,
      exp: 58
    },

    {
      value: 6,
      label: "Onyx",
      points: 6,
      exp: 73
    },

    {
      value: 7,
      label: "Zenyte",
      points: 7,
      exp: 90
    }
  ],
  items: [
    {
      id: "beginner_wand",
      wandPart: true,
      active: true,
      label: "Beginner wand",
      points: {
        tele: 30,
        alch: 30,
        enchant: 300,
        grav: 30
      }
    },
    {
      id: "apprentice_wand",
      wandPart: true,
      active: true,
      label: "Apprentice wand",
      points: {
        tele: 60,
        alch: 60,
        enchant: 600,
        grav: 60
      }
    },
    {
      id: "teacher_wand",
      active: true,
      wandPart: true,
      label: "Teacher wand",
      points: {
        tele: 150,
        alch: 200,
        enchant: 1500,
        grav: 150
      }
    },
    {
      id: "master_wand",
      wandPart: true,
      active: true,
      label: "Master wand",
      points: {
        tele: 240,
        alch: 240,
        enchant: 2400,
        grav: 240
      }
    },
    {
      id: "infinity_gloves",
      active: false,
      label: "Infinity gloves",
      points: {
        tele: 175,
        alch: 225,
        enchant: 1500,
        grav: 175
      }
    },
    {
      id: "infinity_hat",
      active: false,
      label: "Infinity hat",
      points: {
        tele: 350,
        alch: 400,
        enchant: 3000,
        grav: 350
      }
    },
    {
      id: "infinity_top",
      active: false,
      label: "Infinity top",
      points: {
        tele: 400,
        alch: 450,
        enchant: 4000,
        grav: 400
      }
    },
    {
      id: "infinity_bottoms",
      active: false,
      label: "Infinity bottoms",
      points: {
        tele: 450,
        alch: 500,
        enchant: 5000,
        grav: 450
      }
    },
    {
      id: "b2p",
      active: true,
      label: "Bones To Peaches",
      points: {
        tele: 200,
        alch: 300,
        enchant: 2000,
        grav: 200
      }
    },
    {
      id: "mages_book",
      label: "Mage's book",
      active: true,
      points: {
        tele: 500,
        alch: 550,
        enchant: 6000,
        grav: 500
      }
    },
    {
      id: "infinity_boots",
      active: true,
      label: "Infinity boots",
      points: {
        tele: 120,
        alch: 120,
        enchant: 1200,
        grav: 120
      }
    }
  ]
};

const reducer = produce((draft, action) => {
  switch (action.type) {
    case TYPES.RESET:
      return initialState;
    case TYPES.SELECT_WANDS:
      for (const item of draft.items) {
        item.active = item.wandPart ? true : false;
      }
      return;
    case TYPES.TOGGLE_ALL_ITEMS:
      for (const item of draft.items) {
        item.active = action.payload;
      }
      return;
    case TYPES.TOGGLE_ITEM:
      draft.items[action.payload.i].active = !draft.items[action.payload.i].active;
      return;
    case TYPES.UPDATE_CONF:
      draft[action.payload.name] = action.payload.value;
      return;
    default:
      return;
  }
}, initialState);

export default reducer;
