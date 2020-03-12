export default {
  methods: {
    decisionBuyer (str = '', name = '') {
      const _str = str
      return _str.split(',').includes(name)
    },
    decisionStatus (statusArr = [], status = -1) {
      return statusArr.includes(status)
    }
  }
}
