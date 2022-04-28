const state = () => ({
  error: "",
});

const mutations = {
  goDisplayValue(state, payload) {
    state.displayValue = payload;
  },
  setError(state, payload) {
    state.error = payload;
  },
};

const actions = {
  setDisplayValue({ commit }, displayValue) {
    commit("goDisplayValue", displayValue);
  },
  async createCustomBoard({ commit, rootState, dispatch }) {
    try {
      const response = await fetch("http://localhost:3000/boards", {
        method: "POST",
        headers: new Headers({
          "content-type": "application/json",
        }),
        body: JSON.stringify({
          themeName: rootState.themeModule.theme,
          squareValue: rootState.squareModule.squares,
        }),
      });
      const data = await response.json();
      if (response.status === 201) {
        await dispatch("fetchThemes");
        commit("setTheme", "");
        commit("setSquares", []);
      } else {
        commit("setError", data.error);
      }
    } catch (error) {
      commit("setError", error);
    }
    // this.theme = "";
    // this.fetchThemes();
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
