<template>
  <code class="relative rounded-sm bg-blue-100 px-1.5 py-1 font-mono inline-code text-blue-700 font-medium">
    <slot />
  </code>
</template>

<style scoped>
.inline-code:not(h1>code, h1>a>code, h2>a>code, h3>a>code, h4>a>code, h5>a>code, strong>a>code) {
  /* text-sm */
  font-size: 0.875rem;
  line-height: 1.25rem;
}
</style>
