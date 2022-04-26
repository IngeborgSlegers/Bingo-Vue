<template>
  <div>
    <ui-button raised @click="open = true">Create!</ui-button>
    <ui-dialog v-model="open" @confirm="onConfirm" fullscreen>
      <ui-dialog-title>Choose from the options below!</ui-dialog-title>
      <ui-dialog-content>
        <ui-tabs v-model="active">
          <ui-tab>Create a new theme</ui-tab>
          <ui-tab>Add to an existing theme</ui-tab>
          <ui-tab>Build a custom board</ui-tab>
        </ui-tabs>
        <ui-panels v-model="active">
          <ui-panel>
            <div class="innerPanel">
              <CreateTheme :fetchThemes="fetchThemes" class="createTheme" />
              <ul class="unorderedList">
                <li v-for="(theme, index) in themes" :key="index">
                  {{ theme.themeName }},
                </li>
              </ul>
            </div>
          </ui-panel>
          <ui-panel><ChooseTheme :themes="themes" /></ui-panel>
          <ui-panel><CreateSquare :fetchThemes="fetchThemes" /></ui-panel>
        </ui-panels>
      </ui-dialog-content>
      <ui-dialog-actions></ui-dialog-actions>
    </ui-dialog>
  </div>
</template>

<script>
import CreateTheme from "./Forms/CreateTheme.vue";
import ChooseTheme from "./Forms/ChooseTheme.vue";
import CreateSquare from "./Forms/CreateSquare.vue";

export default {
  components: { CreateTheme, ChooseTheme, CreateSquare },
  props: {
    modalOpen: Boolean,
    onConfirm: Function,
    fetchThemes: Function,
    themes: Array,
  },
  data() {
    return {
      open: this.modalOpen,
      active: 0,
    };
  },
};
</script>

<style>
.createTheme {
  display: flex;
  align-content: center;
  flex-direction: column;
  justify-content: center;
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
}
</style>
