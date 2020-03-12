export default {
  methods: {
    beforeUnloadHandler (e) {
    }
  },
  mounted () {
    window.addEventListener('beforeunload', e => this.beforeUnloadHandler(e))
  },
  destroyed () {
    window.removeEventListener('beforeunload', e => this.beforeUnloadHandler(e))
  }
}
