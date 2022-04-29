<template>
  <ui-card
    outlined
    class="square"
    :style="{ backgroundColor: square.checked ? '#f9812e' : null }"
    @click="checkedASquare({ rowIndex, squareIndex })"
  >
    <ui-card-actions
      ><ui-card-buttons :style="{color: square.checked ? 'white' : 'black'}">{{ square.value }}</ui-card-buttons></ui-card-actions
    >
  </ui-card>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  props: ["rowIndex", "squareIndex", "square"],
  methods: {
    ...mapActions({
      checkedASquare: "boardModule/checkedASquare",
    }),
  },
  computed: {
    ...mapState({
      coordinates: (state) => state.boardModule.coordinates,
      board: (state) => state.boardModule.board,
    }),
  },
};
</script>

<style>
.square {
  background: #fff;
  border: 1px solid #999;
  float: left;
  font-weight: bold;
  height: 10vw;
  margin-right: -1px;
  margin-top: -1px;
  padding: 1em;
  text-align: center;
  width: 10vw;
}

.mdc-card {
  justify-content: center;
  align-items: center;
}

.mdc-card.mdc-theme--on-surface {
  border-radius: 0;
}
</style>
