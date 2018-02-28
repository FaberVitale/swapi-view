//@flow
export const api = {
  method: "GET",
  headers: {
    accept: "application/json"
  }
};

export const image = {
  method: "GET",
  headers: {
    accept: "image/png"
  },
  mode: "same-origin"
};
