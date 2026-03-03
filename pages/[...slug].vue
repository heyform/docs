<template>
  <LayoutHeader />
  <div class="border-b min-h-screen">
    <div
      class="container px-4 md:px-8 flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-12"
    >
      <aside
        class="fixed top-[102px] lg:top-16 lg:mt-12 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block overflow-y-auto border-r bg-muted/10"
      >
        <LayoutAside :is-mobile="false" />
      </aside>
      <main class="relative py-8 md:py-10" :class="[config.toc.enable && 'lg:gap-12 lg:grid lg:grid-cols-[minmax(0,45rem)_13rem] lg:justify-center']">
        <div class="docs-main-content docs-body w-full min-w-0">
          <LayoutBreadcrumb v-if="page?.body && config.main.breadCrumb" class="mb-4" />

          <div v-if="config.main.showTitle" class="space-y-3">
            <ProseH1>
              {{ page?.title }}
            </ProseH1>
            <ProseP v-if="page?.description" class="mt-0 mb-1 text-slate-600 dark:text-slate-400">
              {{ page.description }}
            </ProseP>
            <ProseHr class="docs-title-divider" />
          </div>

          <Alert v-if="!page?.body || page?.body?.children?.length === 0" title="Empty Page" icon="lucide:circle-x">
            Start writing in <ProseCodeInline>content/{{ page?._file }}</ProseCodeInline> to see this page taking shape.
          </Alert>

          <ContentRenderer v-else :key="page._id" :value="page" class="docs-content" />

          <LayoutPrevNext />
        </div>
        <div v-if="config.toc.enable" class="hidden lg:block">
          <div class="sticky top-[90px] h-[calc(100vh-3.5rem)] overflow-hidden border-l pl-4">
            <LayoutToc :is-small="false" />
          </div>
        </div>
      </main>
    </div>
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
