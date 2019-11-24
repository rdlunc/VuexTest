<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <!-- 写法1： -->
        <!--
        <TodoHeader/>
        <TodoList/>
        <TodoFooter/>
        -->
        <!-- 写法2： -->
        <!-- 自定义事件方式1： -->
        <!-- <todo-header @addTodo="addTodo"/> --> <!-- 给todo-header标签对象绑定addTodo事件监听 -->
        <!-- 自定义事件方式2： -->
        <todo-header ref="header"/>

        <!-- 组件间通信 3: 消息订阅与发布(PubSubJS 库) -->
        <todo-list :todos="todos" />

        <!-- 组件间通信 4: slot -->
        <TodoFooter>
          <input slot="checkAll" type="checkbox" v-model="isAllCheck">
          <span slot="count">已完成{{completeSize}} / 全部{{todos.length}}</span>
          <button slot="delete" class="btn btn-danger" v-show="completeSize" @click="deleteCompleteTodos">清除已完成任务</button>
        </TodoFooter>

      </div>
    </div>
  </div>
</template>

<!--
绑定事件监听 --- 订阅消息
触发事件 --- 发布消息
-->
<script>
  import StorageUtil from './util/StorageUtil'
  import PubSub from 'pubsub-js'
  import TodoHeader from './components/TodoHeader'
  import TodoList from './components/TodoList'
  import TodoFooter from './components/TodoFooter'

  export default {
    name: 'App.vue',
    data() {
      return {
        //从localStorage读取todos
        todos: StorageUtil.readTodos()
      }
    },
    computed: {
      completeSize() {
        return this.todos.reduce((preTotal, todo) => preTotal + (todo.complete ? 1 : 0), 0)
      },
      isAllCheck: {
        get() {
          return this.completeSize === this.todos.length && this.completeSize > 0
        },
        set(value) { //value是当前checkbox最新的值
          this.selectAllTodos(value)
        }
      }
    },
    mounted() { //执行异步代码
      //给<todo-header/> 绑定addTodo事件监听
      //this.$on('addTodo', this.addTodo) //给App绑定的监听，不对
      this.$refs.header.$on('addTodo', this.addTodo)

      //订阅消息
      PubSub.subscribe('deleteTodo', (msg, index) => {
        this.deleteTodo(index)
      })
    },
    methods: {
      addTodo(todo) {
        this.todos.unshift(todo)
      },
      deleteTodo(index) {
        this.todos.splice(index, 1)
      },
      //删除所有选中的todo
      deleteCompleteTodos() {
        this.todos = this.todos.filter(todo => !todo.complete)
      },
      //全选/全不选
      selectAllTodos(check){
        this.todos.forEach(todo => todo.complete = check)
      }
    },
    watch: { //监视
      todos: {
        deep: true, //深度监视
        // handler: function (value) {
        //   //将todos最新的值的json数据，保存到localStorage
        //   StorageUtil.saveTodos(value)
        // }
        //简洁写法：
        handler: StorageUtil.saveTodos
        /*
        上述写法，等价于：
        handler：function(todos) {
          window.localStorage.setItem(TODOS_KEY, JSON.stringify(todos))
        }
        */
      }
    },
    components: {
      TodoHeader,
      TodoList,
      TodoFooter
    }
  }
</script>

<style scoped>
  /*app*/
  .todo-container {
    width: 600px;
    margin: 0 auto;
  }
  .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
</style>
