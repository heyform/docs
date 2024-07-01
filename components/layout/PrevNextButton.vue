<template>
  <NuxtLink v-if="prevNext && prevNext._path" :to="prevNext._path" class="basis-1/3">
    <div class="border px-3.5 py-2 rounded-lg hover:bg-muted/50 transition-all space-y-2 mb-4">
      <div class="flex flex-row gap-3">
        <div v-if="side === 'left'" class="flex h-6 w-6 min-w-6">
          <Icon name="lucide:arrow-left" size="20" class="self-center mx-auto" />
        </div>
        <span class="self-center space-y-2">
          <div class="font-medium text-sm/6">
            {{ prevNext.title }}
          </div>
        </span>
        <div v-if="side === 'right'" class="flex h-6 w-6 min-w-6 ml-auto">
          <Icon name="lucide:arrow-right" size="20" class="self-center mx-auto" />
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  prevNext: any;
  side: 'left' | 'right';
}>();
</script>
