<script setup lang="ts">
import settings from '~/settings'

defineProps({
  collapse: {
    type: Boolean,
    required: true,
  },
})

const title = settings.title
</script>

<template>
  <div
    class="sidebar-logo-container"
    :class="{ collapse }"
  >
    <transition name="sidebarLogoFade">
      <router-link
        v-if="collapse"
        key="collapse"
        class="sidebar-logo-link"
        to="/"
      >
        <img src="@svg/times-logo-min.svg" class="sidebar-logo" alt="logo">
        <!-- <svg-icon name="xy-logo" size="50" class="sidebar-logo" /> -->
      </router-link>
      <router-link
        v-else
        key="expand"
        class="sidebar-logo-link"
        to="/"
      >
        <img src="@svg/times-logo.svg" class="sidebar-logo" alt="logo">
        <!-- <svg-icon name="times-logo" class="sidebar-logo" /> -->
        <h1 class="sidebar-title">
          {{ title }}
        </h1>
      </router-link>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      //width: 32px;
      //height: 32px;
      vertical-align: middle;
      //margin-right: 12px;
      width: 100%;
      height: 100%;
      padding: 8px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
