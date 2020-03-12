<template lang="pug">
  div.err-content
    img.err-image(:src="errImage")
    div.txt 哎呀，好像出错了，请联系管理员~
</template>

<script>
import errImage from 'src/assets/images/icon-error.png'

export default {
  data () {
    return {
      errImage: errImage
    }
  }
}
</script>

<style lang="scss" scoped>
  .err-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: -80px;
    justify-content: center;
    .err-image {
      width: 450px;
      height: 300px;
    }

    .txt {
      margin-top: 20px;
    }

  }
</style>
