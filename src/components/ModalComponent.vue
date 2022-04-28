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
          <ui-panel><CreateTheme /></ui-panel>
          <ui-panel><ChooseTheme /></ui-panel>
          <!-- <ui-panel><CreateSquare :fetchThemes="fetchThemes" /></ui-panel> -->
        </ui-panels>
      </ui-dialog-content>
      <ui-dialog-actions></ui-dialog-actions>
    </ui-dialog>
  </div>
</template>

<script>
import CreateTheme from "./Forms/CreateTheme.vue";
import ChooseTheme from "./Forms/ChooseTheme.vue";
// import CreateSquare from "./Forms/CreateSquare.vue";

export default {
  components: {
    CreateTheme,
    ChooseTheme,
    // CreateSquare
  },
  props: {
    modalOpen: Boolean,
    onConfirm: Function,
  },
  data() {
    return {
      open: this.modalOpen,
      active: 0,
    };
  },
};
</script>

<style></style>
