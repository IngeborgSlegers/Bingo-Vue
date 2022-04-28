<template class="innerPanel">
  <div class="createTheme">
    <ui-form nowrap item-margin-bottom="16" label-width="80">
      <template #default="{ actionClass }">
        <ui-form-field>
          <ui-textfield :value="theme" @input="(e) => setTheme(e.target.value)"
            >Create a Theme</ui-textfield
          >
        </ui-form-field>
        <ui-form-field :class="actionClass">
          <ui-button raised @click.prevent="createTheme()">Create!</ui-button>
        </ui-form-field>
      </template>
    </ui-form>
    <ul class="unorderedList">
      <li v-for="(theme, index) in themes" :key="index">
        {{ theme.themeName }},
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      themes: (state) => state.themeModule.themes,
      theme: (state) => state.themeModule.theme,
    }),
  },
  methods: {
    ...mapActions({
      createTheme: "themeModule/createTheme",
      fetchThemes: "themeModule/fetchThemes"
    }),
    ...mapMutations({
      setTheme: "themeModule/setTheme",
    }),
  }
};
</script>

<style>
.createTheme {
  display: flex;
  align-content: center;
  /* flex-direction: column; */
  justify-content: space-around;
}
.innerPanel {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-content: center;
}

.unorderedList {
  list-style-type: none;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding-inline-start: 0;
  width: 7em;
}
</style>
