<template>
  <div class="main">
    <BoardLogic />
    <DunnoComp />
    <h2>Or create your own!</h2>
    <ModalComponent :open="modalOpen" />
  </div>
</template>

<script>
import BoardLogic from "./components/BoardLogic.vue";
import ModalComponent from "./components/ModalComponent.vue";
import DunnoComp from "./components/DunnoComp.vue";
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  components: {
    BoardLogic,
    ModalComponent,
    DunnoComp,
  },
  data() {
    return {
      modalOpen: false,
    };
  },
  computed: {
    ...mapState({
      themes: (state) => state.themeModule.themes,
      theme_id: (state) => state.themeModule.theme_id,
      board: (state) => state.boardModule.board,
      coordinates: (state) => state.boardModule.coordinates,
    }),
  },
  methods: {
    ...mapActions({
      fetchThemes: "themeModule/fetchThemes",
      fetchBoard: "boardModule/fetchBoard",
    }),

    ...mapMutations({
      setThemeID: "themeModule/setThemeID",
      setBoard: "boardModule/setBoard",
    }),

    onConfirm(result) {
      if (result) {
        console.log("ok");
      } else {
        console.log("cancel");
      }
    },
  },
  created() {
    this.fetchThemes();
  },
  watch: {
    board(newState) {
      this.setBoard(newState);
    },
    open(newState, oldState) {
      console.log("I'm watching you", newState, oldState);
      this.open = newState;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
}

.main {
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  margin: 0;
}

.mdc-form.mdc-form--horizontal {
  margin-top: 16px;
}

body {
  background-color: #1881ea;
  margin: 0;
  color: white;
}

.mdc-button--raised {
  background-color: #0C0033!important;
}
</style>
