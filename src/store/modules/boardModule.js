import boardDataTemplate from "@/components/boardDataTemplate";

const state = () => ({
  error: "",
  board: boardDataTemplate,
  coordinates: {
    row: null,
    column: null,
  },
});

const mutations = {
  goDisplayValue(state, payload) {
    state.displayValue = payload;
  },
  setError(state, payload) {
    state.error = payload;
  },
  setBoard(state, payload) {
    state.board = payload;
  },
  setBoardChecked(state, payload) {
    const { row, column } = payload;
    state.board[row][column].checked = true;
  },
  setCoordinates(state, payload) {
    const { rowIndex, squareIndex } = payload;
    state.coordinates = {
      row: rowIndex,
      column: squareIndex,
    };
  },
};

const actions = {
  async createCustomBoard({ commit, rootState, dispatch }) {
    try {
      const response = await fetch("https://bingo-rails.herokuapp.com/boards", {
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
  },

  async fetchBoard({ commit, rootState }) {
    try {
      const response = await fetch(
        `https://bingo-rails.herokuapp.com/squares/${rootState.themeModule.theme_id}`
      );
      const data = await response.json();
      if (data.board) {
        commit("setBoard", data.board);
      } else {
        commit("setError", data.error);
      }
    } catch (error) {
      commit("setError", error);
    }
  },

  checkedASquare({ commit, state }, payload) {
    const { rowIndex, squareIndex } = payload;
    commit("setCoordinates", { rowIndex, squareIndex });
    commit("setBoardChecked", state.coordinates);
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
