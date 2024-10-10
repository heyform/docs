<template>
  <h5 :class="cn('mt-2 mb-2 text-xl font-medium leading-none tracking-tight', props.class)">
    <slot />
  </h5>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();
</script>
