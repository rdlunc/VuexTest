<template>
  <!--
  onmouseenter="" onmouseleave="" : 移进或离开元素会触发，但是元素中有内嵌元素，鼠标移进内嵌元素不触发；
  onmouseover="" onmouseout=""：移进或离开元素会触发，但是元素中有内嵌元素，鼠标移进内嵌元素也会触发；
  -->
  <li @mouseenter="handleEnter(true)" @mouseleave="handleEnter(false)" :style="{background: bgColor}">
    <label>
      <input type="checkbox" v-model="todo.complete"/>
      <span>{{todo.title}}</span>
    </label>
    <button class="btn btn-danger" v-show="isShow" @click="deleteItem">删除</button>
  </li>
</template>

<script>
  import PubSub from 'pubsub-js'

  export default {
    name: 'TodoItem',
    props: {
      todo: Object,
      index: Number
    },
    data() {
      return {
        bgColor: 'white', //默认的背景颜色
        isShow: false //按钮默认是否显示
      }
    },
    methods: {
      handleEnter(isEnter) {
        console.log(isEnter)
        if(isEnter){
          this.bgColor = '#aaaaaa'
          this.isShow = true
        }
        else{
          this.bgColor = 'white'
          this.isShow = false
        }
      },
      deleteItem(){
        const {todo, index} = this
        if(window.confirm(`确认删除${todo.title}吗？`)){
          //发布消息
          PubSub.publish('deleteTodo', index)
        }
      }
    }
  }
</script>

<style>
  /*item*/
  li {
    list-style: none;
    height: 36px;
    line-height: 36px;
    padding: 0 5px;
    border-bottom: 1px solid #ddd;
  }

  li label {
    float: left;
    cursor: pointer;
  }

  li label li input {
    vertical-align: middle;
    margin-right: 6px;
    position: relative;
    top: -1px;
  }

  li button {
    float: right;
    display: none;
    margin-top: 3px;
  }

  li:before {
    content: initial;
  }

  li:last-child {
    border-bottom: none;
  }
</style>
