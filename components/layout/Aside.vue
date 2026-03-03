<template>
  <UiScrollArea orientation="vertical" class="relative overflow-hidden h-full py-5 pr-4 text-[13px]" type="hover">
    <LayoutHeaderNavMobile v-if="isMobile" class="border-b pb-2 mb-4" />
    <LayoutSearchButton v-if="config.search.inAside" />
    <ul v-if="config.aside.useLevel" class="pb-3 border-b mb-2">
      <li v-for="link in navigation" :key="link.id">
        <NuxtLink
          :to="link._path"
          class="mb-0.5 flex w-full gap-2 border-l-2 border-transparent px-2 py-1.5 text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground"
          :class="[
            path.startsWith(link._path) && 'border-l-primary/70 bg-accent/45 font-medium text-foreground',
          ]"
        >
          <Icon
            v-if="link.icon"
            :name="link.icon"
            class="self-center"
            size="16"
          />
          {{ link.title }}
        </NuxtLink>
      </li>
    </ul>
    <LayoutAsideTree :links="tree" :level="0" class="pt-2" />
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
</script>
