<template>
  <div>
    <ui-form nowrap item-margin-bottom="16" label-width="80">
      <template #default="{ actionClass }">
        <ui-form-field>
          <ui-textfield v-model="theme">Create a Theme</ui-textfield>
        </ui-form-field>
        <ui-form-field v-for="n in 25" :key="n - 1">
          <ui-textfield v-model="squares[n - 1]">Option {{ n }}</ui-textfield>
        </ui-form-field>
        <ui-form-field :class="actionClass">
          <ui-button raised @click.prevent="createCustomBoard()"
            >Create Board!</ui-button
          >
        </ui-form-field>
      </template>
    </ui-form>
  </div>
</template>

<script>
export default {
  props: {
    fetchThemes: Function,
  },
  data() {
    return {
      theme: "",
      squares: [],
    };
  },
  methods: {
    async createCustomBoard() {
      const response = await fetch("http://localhost:3000/boards", {
        method: "POST",
        headers: new Headers({
          "content-type": "application/json",
        }),
        body: JSON.stringify({ themeName: this.theme, squareValue: this.squares}),
      });
      const data = await response.json();
      console.log(data)
      this.theme = "";
      this.fetchThemes();
    },
    handleChange(e) {
      this.squares = e.target.value;
    },
  },
};
</script>

<style></style>
