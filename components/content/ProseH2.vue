<template>
  <h2
    :id="id"
    class="scroll-m-20 text-2xl font-semibold tracking-tight text-slate-900 transition-colors dark:text-slate-100 docs-section"
  >
    <NuxtLink v-if="id && generate" :href="`#${id}`">
      <slot />
    </NuxtLink>
    <slot v-else />
  </h2>
</template>

<script setup lang="ts">
const props = defineProps<{ id?: string }>();

const { headings } = useRuntimeConfig().public.mdc;
const generate = computed(() => props.id && headings?.anchorLinks?.h2);
</script>
