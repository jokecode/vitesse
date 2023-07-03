<script setup lang="ts">
import ScrollPane from '~/layouts/components/TagsView/ScrollPane.vue'

const buttons = [
  // 类型 "" | "primary" | "success" | "info" | "warning" | "danger"
  // 不可分配给类型 "primary" | "success" | "warning" | "danger" | "info" | "text"
  { type: '', text: 'plain' },
  { type: 'primary', text: 'primary' },
  { type: 'success', text: 'success' },
  { type: 'info', text: 'info' },
  { type: 'warning', text: 'warning' },
  { type: 'danger', text: 'danger' },
] as const
</script>

<template>
  <p>Basic text button</p>
  <div class="justify-space-between mb-4 flex flex-wrap gap-4">
    <el-button
      v-for="button in buttons"
      :key="button.text"
      :type="button.type"
      text
    >
      {{ button.text }}
    </el-button>
  </div>

  <p>Background color always on</p>
  <div class="justify-space-between mb-4 flex flex-wrap gap-4">
    <el-button
      v-for="button in buttons"
      :key="button.text"
      :type="button.type"
      text
      bg
    >
      {{ button.text }}
    </el-button>
  </div>

  <p>Disabled text button</p>
  <div class="justify-space-between flex flex-wrap gap-4">
    <el-button
      v-for="button in buttons"
      :key="button.text"
      :type="button.type"
      text
      disabled
    >
      {{ button.text }}
    </el-button>
  </div>

  <div>===================</div>
  <div>===================</div>
  <div>
    <ScrollPane>
      <ul>
        <li v-for="item in 120" :key="item">
          {{ item }}
        </li>
      </ul>
    </ScrollPane>
  </div>
  <div>===================</div>
  <div>===================</div>
</template>
