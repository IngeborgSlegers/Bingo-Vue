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
        dispatch("snackBarModule/triggerBanner", {message: data.error, type: "error"}, {root: true});
      }
    } catch (error) {
      dispatch("snackBarModule/triggerBanner", {message: error, type: "error"}, {root: true});
    }
  },

  async fetchBoard({ commit, dispatch, rootState }) {
    try {
      const response = await fetch(
        `${APIURL}/squares/${rootState.themeModule.theme_id}`
      );
      const data = await response.json();
      console.log(data)
      if (data.board) {
        commit("setBoard", data.board);
        dispatch("snackBarModule/triggerBanner", {message: data.message, type: "confirmation", toggle: true}, {root: true});
      } else {
        dispatch("snackBarModule/triggerBanner", {message: data.error ? data.error : data.message, type: "error", toggle: true}, {root: true});
      }
    } catch (error) {
      dispatch("snackBarModule/triggerBanner", {message: error, type: "error", toggle: true}, {root: true});
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
