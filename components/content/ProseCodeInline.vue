<template>
  <code class="docs-inline-code rounded-md bg-slate-100 px-2 py-1 text-[0.83em] text-slate-800 dark:bg-slate-800 dark:text-slate-100">
    <slot />
  </code>
</template>

<style scoped>
.inline-code:not(h1>code, h1>a>code, h2>a>code, h3>a>code, h4>a>code, h5>a>code, strong>a>code) {
  line-height: 1.2rem;
}
</style>
