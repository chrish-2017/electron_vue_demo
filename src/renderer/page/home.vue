<template>
  <div class="wrapper">
    <img class="img-responsive" :src="bg">
    <Button class="btn-bottom" type="primary" @click="goTodo">新建待办</Button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      bg: 'static/bg.jpg'
    }
  },
  methods: {
    goTodo () {
      this.$router.push('/todo')
    }
  }
}
</script>

<style>
  .wrapper {
    position: relative;
  }
  .img-responsive {
    width: 100%;
  }
  .btn-bottom {
    width: 100px;
    position: absolute;
    left: 50%;
    bottom: 20%;
    transform: translate(-50%, 0);
  }
</style>
