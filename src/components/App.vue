<template>
  <div id="app" data-server-rendered="true">
    <span class="title">Hello world!</span><br />
    <span>{{ $tc('seconds', seconds) }}</span
    ><br />
    <router-view></router-view>
  </div>
</template>

<script>
  import { mapFields } from 'vuex-map-fields'

  export default {
    name: 'App',
    data() {
      return {
        seconds: 0
      }
    },
    computed: {
      ...mapFields({
        debug: 'debug'
      })
    },
    mounted() {
      if (window['isPrerenderer'])
        document.dispatchEvent(new Event('render-event'))

      setInterval(() => {
        this.seconds++
      }, 1000)
    }
  }
</script>

<style lang="scss" scoped>
  //noinspection CssUnknownTarget
  @import '@styles/index.scss';

  .title {
    width: fit-content;
    color: red;
  }
</style>
