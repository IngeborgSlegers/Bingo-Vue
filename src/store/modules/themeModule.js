const state = () => ({
  themes: [],
  theme_id: 0,
  error: "",
  theme: "",
});

const mutations = {
  setThemes(state, payload) {
    state.themes = payload;
  },
  setError(state, payload) {
    state.error = payload;
  },
  setTheme(state, payload) {
    state.theme = payload;
  },
  setThemeID(state, payload) {
    state.theme_id = payload;
  },
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
      const response = await fetch("http://localhost:3000/themes");
      const data = await response.json();
      commit("setThemes", data);
    } catch (error) {
      commit("setError", error);
    }
  },

  async createTheme({ dispatch, commit, state }) {
    try {
      const response = await fetch("http://localhost:3000/themes", {
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
  getters,
  actions,
  mutations,
};
