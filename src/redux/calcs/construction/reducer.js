import produce from "immer";

import { setGoalAndSkills, updateStartGoalHelper } from "redux/helpers";

import * as TYPES from "./types";
import { LOOKUP_RSN_OK } from "redux/lookup/types";

const initialState = {
  logs: 100,
  oak_logs: 500,
  teak_logs: 1000,
  mahogany_logs: 2000,
  plank: 500,
  oak_plank: 1000,
  teak_plank: 5000,
  mahogany_plank: 10000,
  long_bone: 10,
  curved_bone: 10,

  selectedRemainingType: "teak_plank",
  plankMakingMethod: 2,
  plankMakingTeakItem: 1,
  plankMakingServant: 2,

  log_types: [
    {
      id: "logs"
    },
    {
      id: "oak_logs"
    },
    {
      id: "teak_logs"
    },
    {
      id: "mahogany_logs"
    }
  ],
  plank_types: [
    {
      id: "plank",
      costToMake: 100,
      xp: 29
    },
    {
      id: "oak_plank",
      costToMake: 250,
      xp: 60
    },
    {
      id: "teak_plank",
      costToMake: 500,
      xp: 90
    },
    {
      id: "mahogany_plank",
      costToMake: 1500,
      xp: 140
    }
  ],
  bone_types: [
    { id: "long_bone", xp: 6750 },
    {
      id: "curved_bone",
      xp: 4500
    }
  ],
  teakItems: [
    {
      value: 1,
      label: "Base (1X)(90xp/plank)"
    },
    {
      value: 1.037,
      label: "Anti-dragon shield (1.037X) (93.33xp/plank)"
    },
    {
      value: 1.074,
      label: "Amulet of glory (1.074X)"
    },
    {
      value: 1.111,
      label: "Cape of legends (1.111X)"
    },
    {
      value: 1.37,
      label: "Mythical cape (1.37X)"
    }
  ],
  plankMakingMethods: [
    {
      value: 1,
      label: "Sawmill running"
    },
    {
      value: 2,
      label: "Sawmill + butler"
    },
    {
      value: 3,
      label: "Lunar"
    }
  ],
  plankMakingServants: [
    {
      value: 1,
      label: "Butler",
      cost: 5000,
      invent: 20
    },
    {
      value: 2,
      label: "Demon butler",
      cost: 10000,
      invent: 26
    }
  ]
};

const reducer = produce((draft, action) => {
  switch (action.type) {
    case TYPES.UPDATE_CONF:
      return {
        ...draft,
        [action.payload.name]: action.payload.value,
        ...updateStartGoalHelper(action.payload.name, action.payload.value)
      };
    case LOOKUP_RSN_OK:
      return {
        ...draft,
        ...setGoalAndSkills(action.payload.skills, "construction", ["magic"])
      };
    default:
      return;
  }
}, initialState);

export default reducer;
