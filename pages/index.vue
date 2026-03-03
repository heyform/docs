<template>
  <LayoutHeader />
  <div class="container px-4 md:px-8 py-8 md:py-10">
    <ContentRenderer
      :key="page._id"
      :value="page"
      class="docs-main-content docs-body"
    />
  </div>
  <LayoutFooter />
</template>

<script setup lang="ts">
const { page } = useContent();
const config = useConfig();

useSeoMeta({
  title: `${page.value?.title ?? '404'} - ${config.value.site.name}`,
  ogTitle: page.value?.title,
  description: page.value?.description,
});
</script>
