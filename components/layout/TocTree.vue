<template>
  <ul :class="[level !== 0 && 'pl-3']">
    <li v-for="link in links" :key="link.id" class="py-0.5">
      <NuxtLink
        :to="`#${link.id}`"
        class="block border-l-2 border-transparent px-2 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
        :class="[activeHeadings.includes(link.id) && 'border-l-primary/70 bg-accent/40 text-foreground']"
      >
        {{ link.text }}
      </NuxtLink>
      <TocTree v-if="link.children" :links="link.children" :level="level + 1" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { TocLink } from '@nuxt/content';

defineProps<{
  links: TocLink[];
  level: number;
}>();

const { activeHeadings, updateHeadings } = useScrollspy();

onMounted(() =>
  updateHeadings([
    ...document.querySelectorAll('.docs-content h1'),
    ...document.querySelectorAll('.docs-content h2'),
    ...document.querySelectorAll('.docs-content h3'),
    ...document.querySelectorAll('.docs-content h4'),
  ]),
);
</script>
