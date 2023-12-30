import APIURL from "@/helpers/environment";

const state = () => ({
  themes: [],
  theme_id: 0,
  theme: "",
  selectedTheme: ""
});

const mutations = {
  setThemes(state, payload) {
    state.themes = payload;
  },
  setTheme(state, payload) {
    state.theme = payload;
  },
  setThemeID(state, payload) {
    state.theme_id = payload;
  },
  setSelectedTheme(state) {
    state.selectedTheme = state.theme
  }
};

const getters = {
  formatThemes: (state) => {
    return state.themes.map((theme) => {
      return {
        label: theme.themeName,
        value: theme.id,
      };
    });
  },
};

const actions = {
  async fetchThemes({ commit }) {
    try {
      const response = await fetch(`${APIURL}/themes`);
      const data = await response.json();
      if (response.status === 200) {
        commit("setThemes", data);
      } else {
        commit("snackBarModule/setError", data.error);
      }
    } catch (error) {
      commit("snackBarModule/setError", error);
    }
  },

  async createTheme({ dispatch, commit, state }) {
    try {
      const response = await fetch(`${APIURL}/themes`, {
        method: "POST",
        headers: new Headers({
          "content-type": "application/json",
        }),
        body: JSON.stringify({ themeName: state.theme }),
      });
      const data = await response.json();
      if (response.status === 201) {
        await dispatch("fetchThemes");
        commit("setTheme", "");
        commit("setSelectedTheme")
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
  getters,
  actions,
  mutations,
};
