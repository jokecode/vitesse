<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator'
import { isExternal } from '~/utils/validate'

@Component({
  name: 'SidebarItemLink',
})
export default class SidebarItemLink extends Vue {
  @Prop({ required: true }) to!: string

  isExternal = isExternal
}
</script>

<template>
  <a
    v-if="isExternal(to)"
    :href="to"
    target="_blank"
    rel="noopener"
  >
    <slot />
  </a>
  <router-link
    v-else
    :to="to"
  >
    <slot />
  </router-link>
</template>
