<template>
  <div class="wrapper">
    <img class="img-responsive" :src="bg">
    <div class="btn-bottom">
      <Button type="primary" @click="goTodo">新建待办</Button>
      <Button type="primary" @click="goUpdate">更新应用</Button>
    </div>
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
    },
    goUpdate () {
      this.$router.push('/update')
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
    width: 170px;
    position: absolute;
    left: 50%;
    bottom: 20%;
    transform: translate(-50%, 0);
  }
</style>
