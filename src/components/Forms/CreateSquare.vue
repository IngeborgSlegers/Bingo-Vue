<template>
  <div>
    <ui-form nowrap item-margin-bottom="16" label-width="80">
      <template #default="{ actionClass }">
        <ui-form-field>
          <ui-textfield 
            :model-value="theme" 
            @input="(e) => setTheme(e.target.value)"
          >
            Create a Theme
          </ui-textfield>
        </ui-form-field>
        <ui-form-field v-for="n in 25" :key="n - 1">
          <ui-textfield
            :model-value="squares[n - 1]"
            @input="(e) => setSquares(e.target.value)"
          >
            Option {{ n }}
          </ui-textfield>
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
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  // props: {
  //   fetchThemes: Function,
  // },
  computed: {
    ...mapState({
      theme: (state) => state.themeModule.theme,
      squares: (state) => state.squareModule.squares,
    }),
  },
  methods: {
    ...mapActions({
      createCustomBoard: "boardModule/createCustomBoard",
    }),
    ...mapMutations({
      setSquares: "squareModule/setSquares",
      setTheme: "themeModule/setTheme",
    }),
    handleChange(e) {
      this.squares = e.target.value;
    },
  },
};
</script>

<style></style>
