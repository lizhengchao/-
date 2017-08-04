<template>
  <div>
    <div class="edit-part">
      <textarea v-model="message" :placeholder="placeholder"></textarea>
    </div>
    <div class="show-part">
      <h2 v-html="outputMessage"></h2>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'bind',
    data () {
      return {
        message: '',
        placeholder: '请输入任意字母'
      }
    },
    computed: {
      outputMessage: function () {
        return this.message.toUpperCase()
      }
    }
  }
</script>
<style scoped>
  .edit-part {
    width: 50%;
    float: left;
  }
  .show-part {
    width: 50%;
    float: left;
  }
</style>
