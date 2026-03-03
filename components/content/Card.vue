<template>
  <div class="h-full">
    <NuxtLink class="block h-full" :to="to" :target="target">
      <article
        class="relative flex h-full items-start gap-4 rounded-2xl border border-slate-200/60 bg-background px-8 py-7 transition-all duration-200"
        :class="[to && 'hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-sm']"
      >
        <div
          v-if="icon"
          class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800/70"
        >
          <Icon class="text-slate-600 dark:text-slate-300" :name="icon" size="22" />
        </div>
        <div class="min-w-0">
          <h3 v-if="title || $slots.title" class="text-lg font-semibold leading-tight text-foreground">
            <ContentSlot :use="$slots.title" unwrap="p" />
            {{ title }}
          </h3>
          <p v-if="description || $slots.description" class="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
            <ContentSlot :use="$slots.description" unwrap="p" />
            {{ description }}
          </p>
          <div v-if="content || $slots.content || $slots.default" class="pt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
            <ContentSlot :use="$slots.content" unwrap="p" />
            <ContentSlot unwrap="p" />
          </div>
          <div v-if="footer || $slots.footer" class="pt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
            <ContentSlot :use="$slots.footer" unwrap="p" />
            {{ footer }}
          </div>
        </div>
        <Icon v-if="to" name="lucide:arrow-up-right" size="16" class="ml-auto mt-1 shrink-0 text-slate-400 dark:text-slate-500" />
      </article>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
  description?: string;
  footer?: string;
  content?: string;
  to?: string;
  target?: string;
  icon?: string;
}>();
</script>
