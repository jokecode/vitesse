<script setup lang="ts">
const { locale } = useI18n()
</script>

<template>
  <EnProcess v-if="locale === 'en'" />
  <ZhProcess v-else />
</template>
