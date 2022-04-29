<template>
  <h1>{{ this.isBingo ? "BINGO!" : "No Bingo" }}</h1>
  <div class="game">
    <div v-for="(row, rowIndex) in board" :key="rowIndex" class="game-board">
      <BoardSquare
        v-for="(square, squareIndex) in row"
        :key="`${rowIndex},${squareIndex}`"
        :rowIndex="rowIndex"
        :square="square"
        :squareIndex="squareIndex"
        class="board-row"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BoardSquare from "./BoardSquare.vue";

export default {
  data() {
    return {
      isBingo: false,
    };
  },
  components: { BoardSquare },
  computed: {
    displayBingoTitle() {
      return this.isBingo ? "BINGO!" : "No Bingo";
    },
    ...mapState({
      board: (state) => state.boardModule.board,
      coordinates: (state) => state.boardModule.coordinates
    }),
  },
  methods: {
    checkRow(rowIndex) {
      let tallie = 0;

      this.board[rowIndex].forEach((square) => {
        if (square.checked) tallie += 1;
      });

      return tallie === 5;
    },

    checkColumn(columnIndex) {
      let tallie = 0;

      let columnArray = this.board.map((row) => {
        return row[columnIndex];
      });

      columnArray.forEach((square) => {
        if (square.checked) tallie += 1;
      });

      return tallie === 5;
    },

    diagonalLeftToRight() {
      let tallie = 0;

      this.board.forEach((row, index) => {
        if (row[index].checked) tallie += 1;
      });

      return tallie === 5;
    },

    diagonalRightToLeft() {
      let tallie = 0;

      this.board.forEach((row, index) => {
        if (row[row.length - index - 1].checked) tallie += 1;
      });

      return tallie === 5;
    },
  },
  watch: {
    coordinates(newState) {
      if (newState.row || newState.column) {
        if (
          this.checkRow(newState.row) ||
          this.checkColumn(newState.column) ||
          this.diagonalLeftToRight() ||
          this.diagonalRightToLeft()
        ) {
          this.isBingo = true;
        }
      }
    },
  },
};
</script>

<style>
.board-row:after {
  clear: both;
  content: "";
  display: table;
}

.game-board {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.game {
  display: flex;
  flex-direction: row;
  /* justify-content: space-evenly; */
  align-content: center;
  align-items: center;
}
</style>
