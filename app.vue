<template>
  <ConfigProvider :use-id="useIdFunction">
    <NuxtLoadingIndicator :color="false" class="z-100 bg-primary80" />
    <NuxtPage />
    <Toaster />
  </ConfigProvider>
</template>

<script setup lang="ts">
import { ConfigProvider } from 'radix-vue';
import Toaster from '@/components/ui/toast/Toaster.vue';

const config = useConfig();
const route = useRoute();
const { themeClass, radius } = useThemes();

const useIdFunction = () => useId();

useSeoMeta({
  description: config.value.site.description,
  ogDescription: config.value.site.description,
  ogImage: config.value.site.ogImage,
  twitterCard: 'summary_large_image',
});

useServerHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://rsms.me/inter/inter.css',
      crossorigin: ''
    },
    {
      rel: 'canonical',
      href: 'https://docs.heyform.net' + route.path
    }
  ],
  htmlAttrs: {
    class: themeClass.value,
    style: `--radius: ${radius.value}rem;`,
  },
  script: [
    {
      src: 'https://analytics.heyform.net/js/script.js',
      defer: true,
      'data-domain': 'heyform.net',
    },
  ],
});
</script>
