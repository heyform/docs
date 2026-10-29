<template>
  <NuxtLink
    :href="href"
    :target="target"
    class="text-[#106BF3] underline decoration-[#106BF3]/40 underline-offset-4 transition-colors hover:text-[#106BF3]/80 hover:decoration-[#106BF3]"
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

defineProps({
  href: {
    type: String,
    default: '',
  },
  target: {
    type: String as PropType<'_blank' | '_parent' | '_self' | '_top' | (string & object) | null | undefined>,
    default: undefined,
    required: false,
  },
});
</script>
