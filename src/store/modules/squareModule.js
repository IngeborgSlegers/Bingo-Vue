import APIURL from "@/helpers/environment";

const state = () => ({
  square: "",
  squares: [],
});

const mutations = {
  setSquare(state, payload) {
    state.square = payload;
  },
  setSquares(state, payload) {
    const { value, index } = payload;
    state.squares[index] = value;
  },
};

const actions = {
  async createSquare({ commit, state }, theme_id) {
    try {
      const response = await fetch(`${APIURL}/squares`, {
        method: "POST",
        headers: new Headers({
          "content-type": "application/json",
        }),
        body: JSON.stringify({
          squareValue: state.square,
          theme_id,
        }),
      });
      const data = await response.json();
      if (response.status === 201) {
        commit("setSquare", "");
      } else {
        commit("snackBarModule/setError", data.error);
      }
    } catch (error) {
      commit("snackBarModule/setError", error);
    }
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
