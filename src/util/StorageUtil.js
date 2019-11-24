/**
 * 使用localStorage存储数据的工具模块
 * 1.函数 -- 一个函数就是一个功能；
 * 2.对象 -- 一个对象可以包含多个功能；即一个对象里可以编写多个函数方法。
 *
 * 问题：工具模块向外暴露函数还是对象，应该如何抉择？
 * 答：选择的依据是你要向外暴露一个功能还是多个功能。如果是一个功能你可以选择函数，多个功能选择对象。
 */
const TODOS_KEY = 'todos_key'

export default {
  //将todos最新的值的json数据，保存到localStorage
  saveTodos(todos) {
    window.localStorage.setItem(TODOS_KEY, JSON.stringify(todos))
  },
  //从localStorage读取todos
  readTodos() {
    return JSON.parse(window.localStorage.getItem(TODOS_KEY) || '[]')
  }

}
