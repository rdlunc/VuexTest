<template>
  <div>
    <p>click {{count}} times, count is {{evenOrOdd}}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementIfOdd">increment if odd</button>
    <button @click="incrementAsync">increment async</button>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name: 'App',
  data () {
    return {}
  },
  computed: {
    // evenOrOdd () {
    //   return this.$store.getters.evenOrOdd
    // },
    // count () {
    //   return this.$store.state.count()
    // }
    ...mapState(['count']), // mapState()返回值：{count(){return this.$store.getters['count']}}
    // ...mapGetters(['evenOrOdd']) // mapGetters()返回值：{evenOrOdd(){return this.$store.getters['evenOrOdd']}}
    ...mapGetters({evenOrOdd: 'evenOrOdd_method'})
  },
  methods: {
    /*
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
   */
    ...mapActions(['increment', 'decrement', 'incrementIfOdd', 'incrementAsync'])
  }
}
</script>

<style>

</style>
