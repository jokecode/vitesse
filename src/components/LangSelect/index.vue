<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator'
import settings from '../../settings'
import { useAppStore } from '~/modules/stores/modules/app'

@Component({
  name: 'Login',
})
export default class Login extends Vue {
  get language() {
    return useAppStore().language
  }

  private handleSetLanguage(lang: string) {
    this.$i18n.locale = lang
    AppModule.SetLanguage(lang)
    document.documentElement.lang = lang
    const title = this.$route.meta.title ? `${this.$t(`route.${this.$route.meta.title}`)} - ${settings.title}` : `${settings.title}`
    document.title = title
    this.$message({
      message: this.$t('components.changeLanguageTips').toString(),
      type: 'success',
    })
  }
}
</script>

<template>
  <el-dropdown
    trigger="click"
    class="international"
    @command="handleSetLanguage"
  >
    <div>
      <svg-icon
        name="language"
        class="international-icon"
      />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          :disabled="language === 'zh'"
          command="zh"
        >
          中文
        </el-dropdown-item>
        <el-dropdown-item
          :disabled="language === 'en'"
          command="en"
        >
          English
        </el-dropdown-item>
        <el-dropdown-item
          :disabled="language === 'es'"
          command="es"
        >
          Español
        </el-dropdown-item>
        <el-dropdown-item
          :disabled="language === 'ja'"
          command="ja"
        >
          日本語
        </el-dropdown-item>
        <el-dropdown-item
          :disabled="language === 'ko'"
          command="ko"
        >
          한국어
        </el-dropdown-item>
        <el-dropdown-item
          :disabled="language === 'it'"
          command="it"
        >
          Italiano
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
