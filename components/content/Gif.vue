<template>
  <img :src="src" :alt="alt">
</template>

<script setup lang="ts">
const { src, alt } = defineProps<{
  src: string;
  alt?: string;
}>();
</script>
