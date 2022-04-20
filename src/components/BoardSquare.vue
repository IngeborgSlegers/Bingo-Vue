<template>
  <button
    class="square"
    :style="{ backgroundColor: square.checked ? 'red' : null }"
    @click="gotASquare(rowIndex, squareIndex)"
  >
    {{ square.value }}
  </button>
</template>

<script>
export default {
  props: ["rowIndex", "squareIndex", "square", "gotASquare"],
};
</script>

<style>
.square{
  background: #fff;
  border: 1px solid #999;
  float: left;
  font-size: 10px;
  font-weight: bold;
  /* line-height: 34px; */
  height: 10em;
  margin-right: -1px;
  margin-top: -1px;
  padding: 1em;
  text-align: center;
  width: 10em;
}
</style>
