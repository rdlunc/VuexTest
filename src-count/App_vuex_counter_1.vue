<template>
  <div>
    <p>click {{$store.state.count}} times, count is {{evenOrOdd}}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementIfOdd">increment if odd</button>
    <button @click="incrementAsync">increment async</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {}
  },
  computed: {
    evenOrOdd () {
      return this.$store.getters.evenOrOdd
    }
  },
  methods: {
    // 增加
    increment () {
      // 通知vuex去增加
      this.$store.dispatch('increment') // 触发store中对应的action调用
    },
    // 减少
    decrement () {
      // 通知vuex去减少
      this.$store.dispatch('decrement')
    },
    // 如果是奇数才增加
    incrementIfOdd () {
      this.$store.dispatch('incrementIfOdd')
    },
    // 过1秒才增加
    incrementAsync () {
      this.$store.dispatch('incrementAsync')
    }
  }
}
</script>

<style>

</style>
