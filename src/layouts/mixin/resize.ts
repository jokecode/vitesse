import { Component, Vue } from 'vue-facing-decorator'
import { DeviceType, useAppStore } from '~/modules/stores/modules/app'

const WIDTH = 992 // refer to Bootstrap's responsive design

@Component({
  name: 'ResizeMixin',
})
export default class ResizeMixin extends Vue {
  get device() {
    return useAppStore().device
  }

  get sidebar() {
    return useAppStore().sidebar
  }

  // @Watch('$route')
  // private onRouteChange() {
  //   if (this.device === DeviceType.Mobile && this.sidebar.opened)
  //     useAppStore().CLOSE_SIDEBAR(false)
  // }

  beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  }

  mounted() {
    const isMobile = this.isMobile()
    if (isMobile) {
      useAppStore().TOGGLE_DEVICE(DeviceType.Mobile)
      useAppStore().CLOSE_SIDEBAR(true)
    }
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler)
  }

  private isMobile() {
    const rect = document.body.getBoundingClientRect()
    return rect.width - 1 < WIDTH
  }

  private resizeHandler() {
    if (!document.hidden) {
      const isMobile = this.isMobile()
      useAppStore().TOGGLE_DEVICE(isMobile ? DeviceType.Mobile : DeviceType.Desktop)
      if (isMobile)
        useAppStore().CLOSE_SIDEBAR(true)
    }
  }
}
