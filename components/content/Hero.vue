<template>
  <section class="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
    <NuxtLink v-if="announcement" :to="announcement.to" :target="announcement.target"
      class="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium">
      <template v-if="announcement.icon">
        <Icon :name="announcement.icon" size="16" />
        <UiSeparator class="mx-2 h-4" orientation="vertical" />
      </template>
      <span class="sm:hidden">{{ announcement.title }}</span>
      <span class="hidden sm:inline">
        {{ announcement.title }}
      </span>
      <Icon name="lucide:arrow-right" class="ml-1 h-4 w-4" />
    </NuxtLink>

    <h1 class="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
      <ContentSlot :use="$slots.title" unwrap="p" />
    </h1>

    <section class="flex w-full items-center justify-center space-x-4 py-4 md:pb-10">
      <NuxtLink v-for="(action, i) in actions" :key="i" :to="action.to" :target="action.target">
        <UiButton :variant="resolvedVariant(action)" :size="resolvedSize(action)">
          <Icon v-if="action.leftIcon" :name="action.leftIcon" class="mr-1" />
          {{ action.name }}
          <Icon v-if="action.rightIcon" :name="action.rightIcon" class="ml-1" />
        </UiButton>
      </NuxtLink>
    </section>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  announcement?: {
    to?: string;
    target?: string;
    icon?: string;
    title: string;
  };
  actions: [{
    name: string;
    leftIcon?: string;
    rightIcon?: string;
    variant?: 'default' | 'link' | 'destructive' | 'outline' | 'secondary' | 'ghost';
    size?: 'default' | 'xs' | 'sm' | 'lg' | 'icon';
    to: string;
    target?: string;
  }];
}>();

function isCreateFormAction(action: { name: string }) {
  return action.name.trim().toLowerCase() === 'create a form';
}

function resolvedVariant(action: { name: string; variant?: 'default' | 'link' | 'destructive' | 'outline' | 'secondary' | 'ghost' }) {
  if (action.variant)
    return action.variant;
  if (isCreateFormAction(action))
    return 'secondary';

  return 'default';
}

function resolvedSize(action: { name: string; size?: 'default' | 'xs' | 'sm' | 'lg' | 'icon' }) {
  if (action.size)
    return action.size;
  if (isCreateFormAction(action))
    return 'sm';

  return 'default';
}
</script>
