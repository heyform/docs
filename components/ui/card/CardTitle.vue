<template>
  <h3 :class="cn('text-base font-medium leading-none tracking-tight', props.class)
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
