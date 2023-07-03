<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator'
import { useSettingStore } from '~/modules/stores/modules/settings'
import ThemePicker from '~/components/ThemePicker/index.vue'

@Component({
  name: 'Settings',
  components: {
    ThemePicker,
  },
})
export default class Settings extends Vue {
  get fixedHeader() {
    return useSettingStore().fixedHeader
  }

  set fixedHeader(value) {
    useSettingStore().CHANGE_SETTING({ key: 'fixedHeader', value })
  }

  get showTagsView() {
    return useSettingStore().showTagsView
  }

  set showTagsView(value) {
    useSettingStore().CHANGE_SETTING({ key: 'showTagsView', value })
  }

  get showSidebarLogo() {
    return useSettingStore().showSidebarLogo
  }

  set showSidebarLogo(value) {
    useSettingStore().CHANGE_SETTING({ key: 'showSidebarLogo', value })
  }

  get sidebarTextTheme() {
    return useSettingStore().sidebarTextTheme
  }

  set sidebarTextTheme(value) {
    useSettingStore().CHANGE_SETTING({ key: 'sidebarTextTheme', value })
  }

  themeChange(value: string) {
    useSettingStore().CHANGE_SETTING({ key: 'theme', value })
  }
}
</script>

<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">
        {{ $t('settings.title') }}
      </h3>

      <div class="drawer-item">
        <span>{{ $t('settings.theme') }}</span>
        <theme-picker
          style="float: right;height: 26px;margin: -3px 8px 0 0;"
          @change="themeChange"
        />
      </div>

      <div class="drawer-item">
        <span>{{ $t('settings.showTagsView') }}</span>
        <el-switch
          v-model="showTagsView"
          class="drawer-switch"
        />
      </div>

      <div class="drawer-item">
        <span>{{ $t('settings.showSidebarLogo') }}</span>
        <el-switch
          v-model="showSidebarLogo"
          class="drawer-switch"
        />
      </div>

      <div class="drawer-item">
        <span>{{ $t('settings.fixedHeader') }}</span>
        <el-switch
          v-model="fixedHeader"
          class="drawer-switch"
        />
      </div>

      <div class="drawer-item">
        <span>{{ $t('settings.sidebarTextTheme') }}</span>
        <el-switch
          v-model="sidebarTextTheme"
          class="drawer-switch"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, .85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, .65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right
  }
}
</style>
