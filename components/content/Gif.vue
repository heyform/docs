<template>
  <div
    style="margin-top: 24px; padding: 40px 40px 0 40px; border-radius: 0.5rem; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); background: linear-gradient(to right, rgb(224, 232, 248), rgb(199, 215, 245));">
    <div
      style="box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 40px, rgba(0, 0, 0, 0.1) 0px 0px 13.3333px; border-radius: 16px 16px 0px 0px;">
      <div style="padding: 6px; background: rgb(243, 244, 246); border-radius: 16px 16px 0px 0px;">
        <img :src="src" :alt="alt" style="border-radius: 16px 16px 0px 0px;" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  src: string
  alt?: string
}>();
</script>