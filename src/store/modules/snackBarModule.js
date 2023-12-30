// import APIURL from "@/helpers/environment";

const state = () => ({
  bannerToggle: false,
  message: "",
  type: ""
});

const mutations = {
  setBannerToggle(state, payload) {
    state.bannerToggle = payload;
  },
  setMessage(state, payload) {
    state.message = payload;
  },
  setType(state, payload) {
    state.type = payload;
  }
};

const actions = {
  triggerBanner({commit}, payload) {
    console.log("this is triggered", payload)
    commit("setBannerToggle", payload.toggle);
    commit("setMessage", payload.message);
    commit("setType", payload.type)
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
