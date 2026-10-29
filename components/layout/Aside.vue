<template>
  <UiScrollArea ref="scrollArea" orientation="vertical" class="relative overflow-hidden h-full py-5 pr-4 text-sm" type="hover">
    <LayoutHeaderNavMobile v-if="isMobile" class="border-b pb-2 mb-4" />
    <LayoutSearchButton v-if="config.search.inAside" />
    <ul v-if="config.aside.useLevel" class="mb-4 space-y-0.5">
      <li v-for="link in navigation" :key="link.id">
        <NuxtLink
          :to="link._path"
          class="block w-full rounded-lg px-3 py-1.5 text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
          :class="[path.startsWith(link._path) && 'bg-muted !text-foreground']"
        >
          {{ link.title }}
        </NuxtLink>
      </li>
    </ul>
    <LayoutAsideTree :links="tree" :level="0" />
  </UiScrollArea>
</template>

<script setup lang="ts">
defineProps<{ isMobile: boolean }>();

const { navDirFromPath } = useContentHelpers();
const { navigation } = useContent();
const config = useConfig();

const tree = computed(() => {
  const route = useRoute();
  const path = route.path.split('/');
  if (config.value.aside.useLevel) {
    const leveledPath = path.splice(0, 2).join('/');

    const dir = navDirFromPath(leveledPath, navigation.value);
    return dir ?? [];
  }

  return navigation.value;
});

const path = useRoute().path;

// Scroll the active link to the top of the sidebar
const route = useRoute();
const scrollArea = ref();
function scrollToActive() {
  const el = scrollArea.value?.$el as HTMLElement | undefined;
  const viewport = el?.querySelector<HTMLElement>('[data-radix-scroll-area-viewport]');
  const active = el?.querySelector<HTMLElement>('a[aria-current="page"]');
  // Keep the active link below its sticky section heading
  const heading = active?.closest('[data-aside-section]')?.querySelector<HTMLElement>('[data-aside-heading]');
  if (viewport && active)
    viewport.scrollTop += active.getBoundingClientRect().top - viewport.getBoundingClientRect().top - (heading?.offsetHeight ?? 0);
}
onMounted(() => nextTick(scrollToActive));
watch(() => route.path,() => nextTick(scrollToActive));
</script>
