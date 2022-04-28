<template>
  <div class="main">
    <BoardLogic
      :board="this.board"
      :coordinates="this.coordinates"
      :gotASquare="this.gotASquare"
    />
    <h2>Choose a theme</h2>
    <ui-form nowrap item-margin-bottom="16" label-width="80">
      <template #default="{ actionClass }">
        <ui-form-field>
          <ui-select
            v-model="theme_id"
            :options="formatThemes(themes)"
            default-label="Select a Theme"
            @change="onSelected($event)"
            >Board Themes</ui-select
          >
        </ui-form-field>
        <ui-form-field :class="actionClass">
          <ui-button raised @click.prevent="fetchBoard()">Fetch!</ui-button>
        </ui-form-field>
      </template>
    </ui-form>
    <h2>Or create your own!</h2>
    <ModalComponent
      :open="modalOpen"
      :fetchThemes="fetchThemes"
      :themes="themes"
    />
  </div>
</template>

<script>
import BoardLogic from "./components/BoardLogic.vue";
import boardDataTemplate from "./components/boardDataTemplate";
import ModalComponent from "./components/ModalComponent.vue";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    BoardLogic,
    ModalComponent,
  },
  data() {
    return {
      board: boardDataTemplate,
      coordinates: { row: null, column: null },
      modalOpen: false,
    };
  },
  computed: {
    ...mapState({
      themes: (state) => state.themeModule.themes,
      theme_id: (state) => state.themeModule.theme_id,
    }),
  },
  methods: {
    ...mapActions({
      fetchThemes: "themeModule/fetchThemes",
    }),

    async fetchBoard() {
      const response = await fetch(
        `http://localhost:3000/squares/${this.theme_id}`
      );
      const data = await response.json();
      if (data.board) this.board = data.board;
    },

    gotASquare(rowIndex, squareIndex) {
      this.board[rowIndex][squareIndex].checked = true;
      this.coordinates = { row: rowIndex, column: squareIndex };
    },

    onSelected(theme) {
      this.theme = theme.id;
    },

    formatThemes(themes) {
      return themes.map((theme) => {
        return {
          label: theme.themeName,
          value: theme.id,
        };
      });
    },

    onConfirm(result) {
      if (result) {
        console.log("ok");
      } else {
        console.log("cancel");
      }
    },
  },
  mounted() {
    this.fetchThemes();
  },
  watch: {
    board(newState) {
      this.board = newState;
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
  color: #2c3e50;
  /* margin-top: 60px; */
}

.main {
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
}

.mdc-form.mdc-form--horizontal {
  margin-top: 16px;
}
</style>
