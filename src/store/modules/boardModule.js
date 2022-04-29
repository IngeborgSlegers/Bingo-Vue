import boardDataTemplate from "@/components/boardDataTemplate";
import APIURL from "@/helpers/environment";

const state = () => ({
  board: boardDataTemplate,
  coordinates: {
    row: null,
    column: null,
  },
});

const mutations = {
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
      const response = await fetch(`${APIURL}/boards`, {
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
        commit("snackBarModule/setError", data.error);
      }
    } catch (error) {
      commit("snackBarModule/setError", error);
    }
  },

  async fetchBoard({ commit, rootState }) {
    try {
      const response = await fetch(
        `${APIURL}/squares/${rootState.themeModule.theme_id}`
      );
      const data = await response.json();
      if (data.board) {
        commit("setBoard", data.board);
      } else {
        commit("snackBarModule/setError", data.error);
      }
    } catch (error) {
      commit("snackBarModule/setError", error);
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
