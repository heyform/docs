<template>
  <div class="[&:not(:first-child)]:mt-5 group-has-[div]:mt-4">
    <NuxtLink :to="to" :target="target">
      <UiCard class="transition-all relative" :class="[to && 'hover:bg-muted']">
        <UiCardHeader v-if="icon || title || $slots.title || description || $slots.description">
          <Icon v-if="icon" class="my-4" :name="icon" size="32" />
          <UiCardTitle v-if="title || $slots.title">
            <ContentSlot :use="$slots.title" unwrap="p" />
            {{ title }}
          </UiCardTitle>
          <UiCardDescription v-if="description || $slots.description">
            <ContentSlot :use="$slots.description" unwrap="p" />
            {{ description }}
          </UiCardDescription>
        </UiCardHeader>
        <UiCardContent v-if="content || $slots.content || $slots.default">
          <ContentSlot :use="$slots.content" unwrap="p" />
          <ContentSlot unwrap="p" />
        </UiCardContent>
        <UiCardFooter v-if="footer || $slots.footer">
          <ContentSlot :use="$slots.footer" unwrap="p" />
          {{ footer }}
        </UiCardFooter>
      </UiCard>
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
