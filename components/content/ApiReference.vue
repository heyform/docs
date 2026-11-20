<template>
  <div class="grid min-w-0 items-start gap-x-8 gap-y-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] xl:grid-rows-[auto_1fr]">
    <div class="flex min-w-0 items-start gap-3 rounded-lg border bg-muted/40 px-4 py-3">
      <span :class="methodColor" class="shrink-0 rounded px-2 text-xs font-semibold leading-6">
        {{ method }}
      </span>
      <code class="min-w-0 break-all text-sm leading-6 text-foreground">{{ path }}</code>
    </div>

    <aside aria-label="Request and response examples" class="api-examples grid min-w-0 auto-rows-max gap-5 xl:sticky xl:top-24 xl:col-start-2 xl:row-span-2 xl:row-start-1 xl:max-h-[calc(100dvh-7rem)] xl:overflow-y-auto">
      <ContentSlot :use="$slots.examples" />
    </aside>

    <div class="min-w-0 xl:col-start-1 xl:row-start-2">
      <ContentSlot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  path: string;
}>();

const methodColors = {
  GET: 'bg-blue-500/10 text-blue-700 dark:text-blue-300',
  POST: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
  PATCH: 'bg-amber-500/10 text-amber-800 dark:text-amber-300',
  DELETE: 'bg-rose-500/10 text-rose-700 dark:text-rose-300',
};
const methodColor = computed(() => methodColors[props.method]);
</script>

<style scoped>
.api-examples :deep(.docs-code) {
  max-width: none;
  margin: 0;
}

.api-examples :deep(button:focus-visible) {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}
</style>
