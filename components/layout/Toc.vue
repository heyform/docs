<template>
  <template v-if="toc?.links.length">
    <UiScrollArea
      v-if="!isSmall"
      orientation="vertical"
      class="hidden h-[calc(100vh-6.5rem)] overflow-y-auto pr-1 text-xs lg:block md:block"
      type="hover"
    >
      <p class="docs-label mb-2 text-muted-foreground">
        {{ title }}
      </p>
      <LayoutTocTree :links="toc.links" :level="0" :class="[links && 'pb-4 border-b']" />
      <div v-if="links" class="pt-4 text-muted-foreground">
        <NuxtLink
          v-for="(link, i) in links"
          :key="i"
          :to="link.to"
          :target="link.target"
          class="flex w-full gap-1.5 py-1.5 text-xs transition-colors hover:text-foreground"
        >
          <Icon
            v-if="link.icon"
            :name="link.icon"
            class="self-center mr-1"
            size="16"
          />
          {{ link.title }}
          <Icon name="lucide:arrow-up-right" class="ml-auto self-center text-muted-foreground" size="13" />
        </NuxtLink>
      </div>
    </UiScrollArea>
    <UiCollapsible v-else v-model:open="isOpen" class="block w-full border-b text-sm lg:hidden">
      <UiCollapsibleTrigger class="px-4 py-3 w-full flex text-left font-medium">
        {{ title }}
        <Icon
          name="lucide:chevron-right"
          class="ml-auto self-center transition-all"
          :class="[isOpen && 'rotate-90']"
        />
      </UiCollapsibleTrigger>
      <UiCollapsibleContent>
        <LayoutTocTree :links="toc.links" :level="0" class="mb-3 mx-4 border-l pl-4 text-sm" />
      </UiCollapsibleContent>
    </UiCollapsible>
  </template>
</template>

<script setup lang="ts">
defineProps<{ isSmall: boolean }>();

const { toc } = useContent();
const { title, links } = useConfig().value.toc;
const isOpen = ref(false);
</script>
