//@flow
import {
  SAVE_IMAGE_URL,
  LOAD_IMAGE,
  FAILED_TO_LOAD_IMAGE
} from "../action/types";

export const statusEnum = {
  IDLE: 0,
  LOADING: 1,
  SUCCESS: 2,
  FAIL: 3
};

export type State = {
  url: string | null,
  status: 0 | 1 | 2 | 3
};

const initState = {
  url: null,
  status: statusEnum.IDLE
};

export const image = (state: State = initState, action: Action) => {
  switch (action.type) {
    case SAVE_IMAGE_URL:
      return {
        status: statusEnum.SUCCESS,
        url: action.url
      };
    case LOAD_IMAGE:
      if (typeof state.url === "string") {
        return state;
      }
      return {
        url: null,
        status: statusEnum.LOADING
      };
    case FAILED_TO_LOAD_IMAGE:
      if (typeof state.url === "string") {
        return state;
      }
      return {
        url: null,
        status: statusEnum.FAIL
      };
    default:
      return state;
  }
};

export default image;
