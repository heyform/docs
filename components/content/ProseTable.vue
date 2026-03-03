<template>
  <div class="[&:not(:first-child)]:mt-6 [&:not(:last-child)]:mb-6 w-full overflow-y-auto rounded-md border border-border">
    <table class="w-full text-sm">
      <slot />
    </table>
  </div>
</template>
