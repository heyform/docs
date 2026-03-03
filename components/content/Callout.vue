<template>
  <Alert :icon="icon" :to="to" :target="target" :type="type" :title="title">
    <slot />
  </Alert>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
  icon?: string;
  type?: 'default' | 'note' | 'tip' | 'warning' | 'important' | 'open-source' | 'opensource' | 'beta' | 'pro' | 'pro-feature' | 'info' | 'success' | 'danger';
  to?: string;
  target?: string;
}>();
</script>
