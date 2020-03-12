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
        $RolesTps () {
          return this.$store.getters.uc ? this.$store.getters.uc.roles : []
        }
      }
    })
  }

}

export default plugin
export const install = plugin.install
