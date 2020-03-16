const plugin = {
  install (vue, options = {}) {
    vue.mixin({
      computed: {
        $name () {
          return this.$store.getters.uc ? this.$store.getters.uc.name : ''
        },
        $Uid () {
          return this.$store.getters.uc ? this.$store.getters.uc.id : ''
        },
        $isSuper () {
          return this.$store.getters.isSuper
        },
        $uid () {
          return this.$store.getters.uc.id
        }
      }
    })
  }

}

export default plugin
export const install = plugin.install
