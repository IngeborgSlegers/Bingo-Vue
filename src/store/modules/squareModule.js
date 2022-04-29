const state = () => ({
  square: "",
  error: "",
  squares: [],
});

const mutations = {
  goDisplayValue(state, payload) {
    state.displayValue = payload;
  },
  setSquare(state, payload) {
    state.square = payload;
  },
  setError(state, payload) {
    state.error = payload;
  },
  setSquares(state, payload) {
    const { value, index } = payload;
    state.squares[index] = value;
  },
};

const actions = {
  setDisplayValue({ commit }, displayValue) {
    commit("goDisplayValue", displayValue);
  },
  async createSquare({ commit, state }, theme_id) {
    try {
      const response = await fetch(`https://bingo-rails.herokuapp.com/squares`, {
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
        commit("setError", data.error);
      }
    } catch (error) {
      commit("setError", error);
    }
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
