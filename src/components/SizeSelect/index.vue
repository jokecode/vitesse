<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator'
import { useAppStore } from '~/modules/stores/modules/app'
import { useTagsViewStore } from '~/modules/stores/modules/tags-view'

@Component({
  name: 'SizeSelect',
})
export default class SizeSelect extends Vue {
  private sizeOptions = [
    { label: 'Default', value: 'default' },
    { label: 'Medium', value: 'medium' },
    { label: 'Small', value: 'small' },
    { label: 'Mini', value: 'mini' },
  ]

  get size() {
    return useAppStore().size
  }

  private handleSetSize(size: string) {
    (this as any).$ELEMENT.size = size
    useAppStore().SET_SIZE(size)
    this.refreshView()
    this.$message({
      message: 'Switch Size Success',
      type: 'success',
    })
  }

  private refreshView() {
    // In order to make the cached page re-rendered
    useTagsViewStore().DEL_ALL_CACHED_VIEWS()
    const { fullPath } = this.$route
    this.$nextTick(() => {
      this.$router.replace({
        path: `/redirect${fullPath}`,
      }).catch((err) => {
        console.warn(err)
      })
    })
  }
}
</script>

<template>
  <el-dropdown
    id="size-select"
    trigger="click"
    @command="handleSetSize"
  >
    <div>
      <svg-icon
        class="size-icon"
        name="size"
      />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item of sizeOptions"
          :key="item.value"
          :disabled="size === item.value"
          :command="item.value"
        >
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
