<template>
  <h2>Choose a theme</h2>
  <ui-form nowrap item-margin-bottom="16" label-width="80">
    <template #default="{ actionClass }">
      <ui-form-field>
        <ui-select
          :model-value="theme_id"
          :options="formatThemes"
          default-label="Select a Theme"
          @selected="(e) => setThemeID(e.value)"
          >Board Themes</ui-select
        >
      </ui-form-field>
      <ui-form-field :class="actionClass">
        <ui-button raised @click.prevent="fetchBoard()">Fetch!</ui-button>
      </ui-form-field>
    </template>
  </ui-form>
</template>

<script>
import { mapActions, mapState, mapMutations, mapGetters } from "vuex";

export default {
  computed: {
    ...mapState({
      themes: (state) => state.themeModule.themes,
      theme_id: (state) => state.themeModule.theme_id,
      board: (state) => state.boardModule.board,
    }),
    ...mapGetters({
      formatThemes: "themeModule/formatThemes",
    }),
  },
  methods: {
    ...mapActions({
      fetchThemes: "themeModule/fetchThemes",
      fetchBoard: "boardModule/fetchBoard",
    }),

    ...mapMutations({
      setThemeID: "themeModule/setThemeID",
    }),
  },
};
</script>

<style></style>
