<template>
  <div :class="cn(
    'py-4 px-2 rounded-lg border bg-card text-card-foreground shadow-sm my-4',
    props.class,
  )
    ">
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();
</script>
