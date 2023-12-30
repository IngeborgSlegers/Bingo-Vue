<template>
  <div>
    <ui-form nowrap item-margin-bottom="16">
      <template #default="{ actionClass }">
        <h5 :class="$tt('headline5')">1. First, create a theme!</h5>
        <ui-form-field>
          <ui-textfield
            :model-value="theme"
            @input="(e) => setTheme(e.target.value)"
          >
            Create a Theme
          </ui-textfield>
        </ui-form-field>
        <h5 :class="$tt('headline5')">2. Next, add at least 25 entries.</h5>
        <div class="inputList">
          <ui-form-field v-for="n in 25" :key="n - 1">
            <ui-textfield
              :model-value="squares[n - 1]"
              @input="
                (e) => setSquares({ value: e.target.value, index: n - 1 })
              "
            >
              Option {{ n }}
            </ui-textfield>
          </ui-form-field>
        </div>
        <h5 :class="$tt('headline5')">3. Punch it Chewy!</h5>
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

<style>
.inputList {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.inputList .mdc-form-field {
  margin-left: 2em;
  margin-right: 2em;
}

.inputList + .mdc-form-field {
  padding-left: 0;
  margin-top: 2em;
}
</style>
