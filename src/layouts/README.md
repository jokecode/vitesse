## Layouts

vue components in this dir are used as layouts.

By default, `default.vue` will be used unless an alternative is specified in the route meta.

With [`vite-plugin-pages`](https://github.com/hannoeru/vite-plugin-pages) and [`vite-plugin-vue-layouts`](https://github.com/JohnCampionJr/vite-plugin-vue-layouts), you can specify the layout in the page's SFCs like this:

```html
<route lang="yaml">
meta:
  layout: home
</route>
```


## 注意
此页面的`<stytle></style>`和`<style lang="scss" scoped></style>`标签里的样式修改后，需要重新运行pnpm run dev才能生效。
