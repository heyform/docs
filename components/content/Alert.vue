<template>
  <div
    class="docs-callout [&:not(:first-child)]:mt-6 transition-colors"
    :class="[typeTwClass[normalizedType], to && 'cursor-pointer hover:brightness-[0.985]']"
    @click="alertClick"
  >
    <div class="flex items-start gap-4">
      <Icon :name="resolvedIcon" size="20" class="callout-icon mt-0.5 shrink-0" />
      <div class="min-w-0 flex-1 text-base leading-[1.7] text-muted-foreground">
        <span v-if="resolvedTitle" class="mb-1 inline-block font-medium text-foreground/85">
          {{ resolvedTitle }}
        </span>
        <div class="[&_p]:m-0 [&_p]:text-base [&_p]:leading-[1.7] [&_a]:underline-offset-4">
          <slot />
        </div>
      </div>
      <Icon v-if="to" name="lucide:arrow-up-right" class="mt-1 shrink-0 text-foreground/45" size="16" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  title?: string;
  icon?: string;
  type?: 'default' | 'note' | 'tip' | 'warning' | 'important' | 'open-source' | 'opensource' | 'beta' | 'pro' | 'pro-feature' | 'info' | 'success' | 'danger';
  to?: string;
  target?: string;
}>(), {
  type: 'note',
});

const typeTwClass = {
  note: 'bg-slate-500/10 text-foreground/75 [&_.callout-icon]:text-slate-600/70 dark:[&_.callout-icon]:text-slate-300/70',
  tip: 'bg-emerald-500/10 text-foreground/75 [&_.callout-icon]:text-emerald-700/70 dark:[&_.callout-icon]:text-emerald-300/70',
  warning: 'bg-amber-500/12 text-foreground/75 [&_.callout-icon]:text-amber-700/70 dark:[&_.callout-icon]:text-amber-300/70',
  important: 'bg-sky-500/11 text-foreground/75 [&_.callout-icon]:text-sky-700/70 dark:[&_.callout-icon]:text-sky-300/70',
  'open-source': 'bg-teal-500/10 text-foreground/75 [&_.callout-icon]:text-teal-700/70 dark:[&_.callout-icon]:text-teal-300/70',
  opensource: 'bg-teal-500/10 text-foreground/75 [&_.callout-icon]:text-teal-700/70 dark:[&_.callout-icon]:text-teal-300/70',
  beta: 'bg-violet-500/10 text-foreground/75 [&_.callout-icon]:text-violet-700/70 dark:[&_.callout-icon]:text-violet-300/70',
  pro: 'bg-indigo-500/10 text-foreground/75 [&_.callout-icon]:text-indigo-700/70 dark:[&_.callout-icon]:text-indigo-300/70',
  'pro-feature': 'bg-indigo-500/10 text-foreground/75 [&_.callout-icon]:text-indigo-700/70 dark:[&_.callout-icon]:text-indigo-300/70',
  default: 'bg-slate-500/10 text-foreground/75 [&_.callout-icon]:text-slate-600/70 dark:[&_.callout-icon]:text-slate-300/70',
  info: 'bg-sky-500/11 text-foreground/75 [&_.callout-icon]:text-sky-700/70 dark:[&_.callout-icon]:text-sky-300/70',
  success: 'bg-emerald-500/10 text-foreground/75 [&_.callout-icon]:text-emerald-700/70 dark:[&_.callout-icon]:text-emerald-300/70',
  danger: 'bg-amber-500/12 text-foreground/75 [&_.callout-icon]:text-amber-700/70 dark:[&_.callout-icon]:text-amber-300/70',
};

const normalizedType = computed(() => {
  if (props.type === 'default')
    return 'note';
  if (props.type === 'success')
    return 'tip';
  if (props.type === 'danger')
    return 'warning';
  if (props.type === 'pro-feature')
    return 'pro';
  if (props.type === 'opensource')
    return 'open-source';

  return props.type;
});

const titleMap = {
  note: 'Note',
  tip: 'Tip',
  warning: 'Warning',
  important: 'Important',
  'open-source': 'Open Source',
  opensource: 'Open Source',
  beta: 'Beta',
  pro: 'Pro Feature',
  'pro-feature': 'Pro Feature',
  info: 'Important',
  success: 'Tip',
  danger: 'Warning',
};

const iconMap = {
  note: 'lucide:info',
  tip: 'lucide:lightbulb',
  warning: 'lucide:triangle-alert',
  important: 'lucide:badge-alert',
  'open-source': 'lucide:box',
  opensource: 'lucide:box',
  beta: 'lucide:flask-conical',
  pro: 'lucide:crown',
  'pro-feature': 'lucide:crown',
  info: 'lucide:info',
  success: 'lucide:lightbulb',
  danger: 'lucide:triangle-alert',
};

const resolvedTitle = computed(() => props.title || titleMap[normalizedType.value]);
const resolvedIcon = computed(() => props.icon || iconMap[normalizedType.value]);

function alertClick() {
  if (props.to) {
    if (props.target) {
      navigateTo(props.to, {
        external: true,
        open: { target: props.target },
      });
    } else {
      navigateTo(props.to, { external: true });
    }
  }
}
</script>
