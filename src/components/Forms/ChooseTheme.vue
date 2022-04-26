<template>
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
      <ui-form-field>
        <ui-textfield v-model="square">Add an option</ui-textfield>
      </ui-form-field>
      <ui-form-field :class="actionClass">
        <ui-button raised @click.prevent="createSquare()">Add</ui-button>
      </ui-form-field>
    </template>
  </ui-form>
</template>

<script>
export default {
  props: { themes: Array },
  data() {
    return {
      square: "",
      theme_id: 0,
    };
  },
  methods: {
    formatThemes(themes) {
      return themes.map((theme) => {
        return {
          label: theme.themeName,
          value: theme.id,
        };
      });
    },

    onSelected(theme) {
      this.theme = theme.id;
    },

    async createSquare() {
      const response = await fetch(`http://localhost:3000/squares`, {
        method: "POST",
        headers: new Headers({
          "content-type": "application/json",
        }),
        body: JSON.stringify({
          squareValue: this.square,
          theme_id: this.theme_id,
        }),
      });
      await response.json();
      this.square = "";
      //   this.fetchThemes();
    },
  },
};
</script>

<style></style>
