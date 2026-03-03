<template>
  <img :src="src" :alt="alt" class="docs-screenshot [&:not(:first-child)]:mt-8 [&:not(:last-child)]:mb-8">
</template>

<script setup lang="ts">
const { src, alt } = defineProps<{
  src: string;
  alt?: string;
}>();
</script>
