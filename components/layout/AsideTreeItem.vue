<template>
  <li class="transition-colors underline-offset-4 [&:not(:first-child)]:pt-1.5">
    <UiCollapsible v-if="link.children" v-model:open="isOpen">
      <UiCollapsibleTrigger class="w-full border-l-2 border-transparent px-2 py-1 text-left text-muted-foreground hover:bg-muted/30 hover:text-foreground">
        <div class="flex w-full gap-1.5">
          <Icon v-if="link.icon" :name="link.icon" class="self-center" size="14" />
          {{ link.title }}
          <Icon
            :name="isOpen ? 'lucide:chevrons-down-up' : 'lucide:chevrons-up-down'" size="12"
            class="ml-auto self-center"
          />
        </div>
      </UiCollapsibleTrigger>
      <UiCollapsibleContent>
        <LayoutAsideTree :links="link.children" :level="level + 1" />
      </UiCollapsibleContent>
    </UiCollapsible>
    <NuxtLink
      v-else
      :to="link._path"
      class="flex w-full gap-1.5 border-l-2 border-transparent px-2 py-1 text-muted-foreground transition-colors hover:bg-muted/30 hover:text-foreground"
      :class="[isActive && 'border-l-primary/70 bg-accent/45 font-medium text-foreground']"
    >
      <Icon v-if="link.icon" :name="link.icon" class="self-center" size="14" />
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

const { collapse } = useConfig().value.aside;

const collapsed = useCollapsedMap();
const isOpen = ref(collapsed.value.get(props.link._path) || (props.level < 1 && !collapse));
watch(isOpen, (v) => {
  collapsed.value.set(props.link._path, v);
});
const isActive = computed(() => props.link._path === useRoute().path);
</script>
