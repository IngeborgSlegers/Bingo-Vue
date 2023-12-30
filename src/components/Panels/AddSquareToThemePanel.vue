<template>
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
      <ui-form-field>
        <ui-textfield :value="square" @input="(e) => setSquare(e.target.value)">
          Add an option
        </ui-textfield>
      </ui-form-field>
      <ui-form-field :class="actionClass">
        <ui-button raised @click.prevent="createSquare(theme_id)">
          Add
        </ui-button>
      </ui-form-field>
    </template>
  </ui-form>

</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      theme_id: (state) => state.themeModule.theme_id,
      square: (state) => state.squareModule.square,
      themes: (state) => state.themeModule.themes,
      squares: (state) => state.squareModule.squares
    }),
    ...mapGetters({
      formatThemes: "themeModule/formatThemes",
    }),
  },
  methods: {
    ...mapActions({
      createSquare: "squareModule/createSquare",
      fetchThemes: "themeModule/fetchThemes",
    }),
    ...mapMutations({
      setSquare: "squareModule/setSquare",
      setThemeID: "themeModule/setThemeID",
    }),
  },
  watch: {
      themes() {
          
      }
  }
};
</script>

<style></style>
