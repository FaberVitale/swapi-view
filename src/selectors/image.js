//@flow
import type { State } from "../reducers";

export const getImage = (state: State) => state.background;

export const getImageStatus = (state: State) => getImage(state).status;

export const getImageURL = (state: State) => getImage(state).url;
