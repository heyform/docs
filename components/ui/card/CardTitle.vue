<template>
  <h3 :class="cn('text-xl font-semibold leading-none tracking-tight', props.class)
    ">
    <slot />
  </h3>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();
</script>
