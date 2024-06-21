<template>
  <img v-if="isArswerReceived" src="../public/done.svg" />
  <img v-else src="../public/undone.svg" />
</template>

<script setup>
const props = defineProps({
  isArswerReceived: Boolean,
  required: true
});
</script>

<style scoped></style>
