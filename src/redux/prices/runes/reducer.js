import { handleActions } from "redux-actions";

import * as TYPES from "./types";

const initialState = {
  geIsLoaded: false,
  geIsLoading: false,

  activeTab: "buy",

  types: ["air", "earth", "water", "fire", "chaos", "death", "blood", "cosmic", "law", "soul", "astral", "nature"],

  elemental: ["air", "earth", "water", "fire"],
  dmg: ["chaos", "death", "blood"],
  utility: ["cosmic", "law", "soul", "astral", "nature"],

  //elemental
  air: {
    current: 0,
    activeShop: "mage_bank",
    buyX: 50,
    shops: ["ge"]
  },
  earth: {
    current: 0,
    activeShop: "mage_bank",
    buyX: 50,
    shops: ["ge"]
  },
  water: {
    current: 0,
    activeShop: "mage_bank",
    buyX: 50,
    shops: ["ge"]
  },
  fire: {
    current: 0,
    activeShop: "mage_bank",
    buyX: 50,
    shops: ["ge"]
  },
  //dmg
  chaos: {
    current: 0,
    activeShop: "mage_bank",
    buyX: 50,
    shops: ["ge", "mage_bank", "wizards_guild", "baby_yaga", "aubury", "thyria"]
  },
  death: {
    current: 0,
    activeShop: "mage_bank",
    buyX: 50,
    shops: ["ge", "mage_bank", "wizards_guild", "baby_yaga", "aubury", "thyria"]
  },
  blood: {
    current: 0,
    activeShop: "wizards_guild",
    buyX: 50,
    shops: ["ge", "wizards_guild", "baby_yaga", "regath_wares"]
  },
  //utility
  cosmic: {
    current: 0,
    activeShop: "mage_bank",
    buyX: 50,
    shops: ["ge", "mage_bank"]
  },
  law: {
    current: 0,
    activeShop: "mage_bank",
    buyX: 50,
    shops: ["ge", "mage_bank", "wizards_guild", "baby_yaga"]
  },
  soul: {
    current: 0,
    activeShop: "wizards_guild",
    buyX: 50,
    shops: ["ge", "wizards_guild", "baby_yaga", "regath_wares"]
  },
  astral: {
    current: 0,
    activeShop: "baby_yaga",
    buyX: 50,
    shops: ["ge", "baby_yaga"]
  },
  nature: {
    current: 0,
    activeShop: "mage_bank",
    buyX: 50,
    shops: ["ge", "mage_bank", "wizards_guild", "baby_yaga"]
  },

  //shops
  ge: {
    label: "Grand exchange"
  },
  baby_yaga: {
    label: "Baby yaga",
    law: { base: 240, multiplier: 2.4, stock: 250 },
    soul: { base: 300, multiplier: 3, stock: 250 },
    chaos: { base: 90, multiplier: 1, stock: 250 },
    blood: { base: 400, multiplier: 4, stock: 250 },
    death: { base: 180, multiplier: 1.785, stock: 250 },
    astral: { base: 50, multiplier: 0.428, stock: 250 },
    nature: { base: 180, multiplier: 1.785, stock: 250 }
  },
  wizards_guild: {
    label: "Wizards guild",
    chaos: { base: 90, multiplier: 0.088, stock: 250 },
    nature: { base: 180, multiplier: 0.18, stock: 250 },
    death: { base: 180, multiplier: 0.18, stock: 250 },
    law: { base: 240, multiplier: 0.24, stock: 250 },
    blood: { base: 400, multiplier: 0.4, stock: 250 },
    soul: { base: 300, multiplier: 0.3, stock: 250 }
  },
  mage_bank: {
    label: "Mage bank",
    nature: { base: 180, multiplier: 0.18, stock: 250 },
    chaos: { base: 90, multiplier: 0.088, stock: 250 },
    law: { base: 240, multiplier: 0.24, stock: 250 },
    cosmic: { buyX: 20, base: 20, multiplier: 0.05, stock: 20 },
    death: { base: 180, multiplier: 0.18, stock: 250 }
  },
  zamorak_mage: {},
  aubury: {
    label: "Aubury",
    chaos: { base: 90, multiplier: 0.088 },
    death: { base: 180, multiplier: 0.18 }
  },

  regath_wares: {
    label: "Regaths's wares",
    blood: { base: 560, multiplier: 4 },
    soul: { base: 420, multiplier: 3 }
  },
  thyria: {
    label: "Thryias's wares",
    chaos: { base: 90, multiplier: 0.088 },
    death: { base: 180, multiplier: 0.18 }
  },

  shops: [
    {
      value: "ge",
      label: "Grand exchange"
    },
    {
      value: "mage_bank",
      label: "Mage bank"
    },
    {
      value: "aubury",
      label: "Aubury"
    },
    {
      value: "wizards_guild",
      label: "Wizards guild"
    },
    {
      value: "baby_yaga",
      label: "Baby yaga"
    },
    {
      value: "regaths_wares",
      label: "Regath's wares"
    },
    {
      value: "thyrias_wares",
      label: "Thyria's wares"
    }
  ],

  //buyXOptions
  buyXOptions: [
    {
      value: 10,
      label: "Buy 10"
    },
    {
      value: 20,
      label: "Buy 20"
    },
    {
      value: 30,
      label: "Buy 30"
    },
    {
      value: 40,
      label: "Buy 40"
    },
    {
      value: 50,
      label: "Buy 50"
    }
  ],

  colSizings: {
    workingPrice: 3,
    rune: 2,
    shop: 4,
    buyX: 3,
    avgPrice: 2,
    set: 2,
    runesNeeded: 4,
    runesNeededCoins: 2
  }
};

export default handleActions(
  {
    [TYPES.UPDATE_BUY_RUNES_NEEDED]: (state, action) => {
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          runesNeeded: action.payload.amount
        }
      };
    },
    [TYPES.UPDATE_BUY_X]: (state, action) => ({
      ...state,
      [action.payload.id]: {
        ...state[action.payload.id],
        buyX: action.payload.buyX
      }
    }),
    [TYPES.UPDATE_BUY_SHOP]: (state, action) => ({
      ...state,
      [action.payload.id]: {
        ...state[action.payload.id],
        activeShop: action.payload.shop
      }
    }),
    [TYPES.SET_BUY_PRICE]: (state, action) => ({
      ...state,
      [action.payload.id]: {
        ...state[action.payload.id],
        current: action.payload.price
      }
    }),
    [TYPES.ON_TAB_CHANGE]: (state, action) => ({ ...state, activeTab: action.payload })
  },
  initialState
);
