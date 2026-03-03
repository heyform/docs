<template>
  <div class="docs-code" :class="[inGroup && 'rounded-none border-x-0 border-b-0 mb-0 mt-0']">
    <div v-if="!inGroup && filename" class="docs-code__header">
      <Icon v-if="icon" :name="icon" class="self-center" />
      <span class="docs-label">{{ filename }}</span>
      <span class="ml-auto">
        <CodeCopy :code="code" />
      </span>
    </div>
    <UiScrollArea>
      <div
        class="docs-code__body overflow-x-auto"
        :class="[`highlight-${language}`, !filename && 'inline-copy']"
      >
        <span v-if="!filename" class="docs-copy-button">
          <CodeCopy :code="code" />
        </span>
        <slot />
      </div>
      <ScrollBar orientation="horizontal" />
    </UiScrollArea>
  </div>
</template>

<script setup lang="ts">
import type { BuiltinLanguage } from 'shiki';
import ScrollBar from '../ui/scroll-area/ScrollBar.vue';

const props = defineProps({
  code: {
    type: String,
    default: '',
  },
  language: {
    type: String as PropType<BuiltinLanguage>,
    default: null,
  },
  filename: {
    type: String,
    default: null,
  },
  inGroup: {
    type: Boolean,
    default: false,
  },
  highlights: {
    type: Array as () => number[],
    default: () => [],
  },
});

const iconMap = new Map(Object.entries(useConfig().value.main.codeIcon));
const icon = iconMap.get(props.filename?.toLowerCase()) || iconMap.get(props.language);
</script>

<style>
.fade-enter-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.shiki .line.highlight {
  background-color: rgb(15 23 42 / 0.9);
}

.shiki .line {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.inline-copy .line {
  padding-right: 3.4rem;
}

.docs-code .shiki,
.docs-code .shiki span {
  background: transparent !important;
}

.docs-code .token.keyword,
.docs-code .keyword {
  color: rgb(34 211 238) !important;
}

.docs-code .token.string,
.docs-code .string {
  color: rgb(251 191 36) !important;
}

.docs-code .token.variable,
.docs-code .variable,
.docs-code .token.parameter,
.docs-code .parameter {
  color: rgb(251 113 133) !important;
}

.docs-code .token.comment,
.docs-code .comment {
  color: rgb(100 116 139) !important;
  font-style: italic;
}
</style>
