import mediumZoom from 'medium-zoom';
import { useDebounceFn } from '@vueuse/core';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  const selector = '.docs-content img';
  const innerWidth = window.innerWidth;

  const zoom = mediumZoom(selector, {
    margin: innerWidth < 640 ? 12 : innerWidth < 1024 ? 24 : 48,
    background: '',
  });

  // responsive varying margin, calculated based on windowSize, upon @resize, debounced
  const debouncedFn = useDebounceFn(() => {
    const innerWidth = window.innerWidth;
    zoom?.update({
      margin: innerWidth < 640 ? 12 : innerWidth < 1024 ? 24 : 48,
    });
  }, 200);

  window.addEventListener('resize', debouncedFn);

  // (re-)init for newly rendered page, also to work in SPA mode (client-side routing)
  nuxtApp.hook('page:finish', () => {
    zoom.detach(selector)
      .attach(selector);
  });
});
