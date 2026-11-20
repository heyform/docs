<template>
  <li :data-aside-section="link.children && level === 0 ? '' : undefined">
    <template v-if="link.children && level === 0">
      <div data-aside-heading class="sticky top-0 z-10 bg-background px-3 pb-1 pt-5 font-semibold text-foreground">
        {{ link.title }}
      </div>
      <LayoutAsideTree :links="link.children" :level="level + 1" />
    </template>
    <UiCollapsible v-else-if="link.children" v-model:open="isOpen">
      <UiCollapsibleTrigger
        class="flex w-full items-center gap-1 rounded-lg px-3 py-1.5 text-left transition-colors hover:bg-muted"
        :class="isActive || isInside ? activeText : inactiveText"
      >
        {{ link.title }}
        <Icon :name="isOpen ? 'lucide:chevron-down' : 'lucide:chevron-right'" size="14" class="text-muted-foreground" />
      </UiCollapsibleTrigger>
      <UiCollapsibleContent>
        <LayoutAsideTree :links="link.children" :level="level + 1" class="ml-6 mt-0.5" />
      </UiCollapsibleContent>
    </UiCollapsible>
    <NuxtLink
      v-else
      :to="link._path"
      class="block w-full rounded-lg px-3 py-1.5 transition-colors hover:bg-muted"
      :class="isActive ? ['bg-muted', activeText] : inactiveText"
    >
      {{ link.title }}
    </NuxtLink>
  </li>
</template>

<script setup lang="ts">
import type { NavItem } from '@nuxt/content';

const props = defineProps<{
  link: NavItem;
  level: number;
}>();

const route = useRoute();

// Folders stay closed unless they contain the current page
const isInside = computed(() => route.path.startsWith(`${props.link._path}/`));
const collapsed = useCollapsedMap();
const isOpen = ref(collapsed.value.get(props.link._path) || isInside.value);
watch(isOpen, (v) => {
  collapsed.value.set(props.link._path, v);
});
watch(isInside, (v) => {
  if (v)
    isOpen.value = true;
});
const isActive = computed(() => props.link._path === route.path);
const activeText = 'font-semibold text-black dark:text-foreground';
const inactiveText = 'text-foreground/80 hover:text-foreground';
</script>
