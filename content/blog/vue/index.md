---
title: 测试
date: "2022-07-20T18:00:32.169Z"
description: vue笔记 不要看官网了看这个 保证学不会
tags: ['vue','MVVM','响应式框架']
disqus: true
---
# vue生命周期

https://juejin.cn/post/6844903945567993870

https://juejin.cn/post/6844904113914773518

> activated, deactivated 是组件keep-alive时独有的钩子
1. beforeCreate
2. created
3. beforeMount
4. mounted
5. beforeUpdate
6. updated
7. activated
8. deactivated
9. beforeDestroy
10. destroyed
11. errorCaptured
## 父子组件生命周期执行顺序

### 加载渲染过程

```
父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted
复制代码
```

### 更新过程

```
父beforeUpdate->子beforeUpdate->子updated->父updated
复制代码
```

### 销毁过程

```
父beforeDestroy->子beforeDestroy->子destroyed->父destroyed
```

## 特别注意 上面加载渲染过程 这是子组件同步引入的父子组件生命周期执行顺序，如果是异步引入组件则是 父组件生命周期执行完毕再执行子组件的生命周期函数



**注意** **在父组件传递接口的数据给子组件时**，一**定要在子组件标签上加上v-if="传递的接口数据"**

> **在父组件的created中发请求获取数据，通过prop传递给子组件。子组件在created或者mounted中拿父组件传递过来的数据**  这样处理是有问题的。
> 在父组件调用接口传递数据给子组件时，接口响应显然是异步的。这会导致无论你在父组件哪个钩子发请求，在子组件哪个钩子接收数据。都是取不到的。当子组件的mounted都执行完之后，此时可能父组件的请求才返回数据。会导致，从父组件传递给子组件的数据是undefined。
**解决方法**1：

在渲染子组件的时候加上一个条件,data1是父组件调用接口返回的数据。当有数据的时候在去渲染子组件。这样就会形成天然的阻塞。在父组件的created中的请求返回数据后，才会执行子组件的created，mounted。最后执行父组件的mounted。

**解决方法2：**

> 在子组件中 watch 监听，父组件获取到值，这个值就会变化，自然是可以监听到的
# 组件通信

## 八种通信方式

https://juejin.cn/post/6844903887162310669#heading-0

* props/$emit
* $$children/$$parent
* provide/inject
* ref/refs
* eventBus
* Vuex
* localStorage/sessionStorage
* $$attrs/$$listeners
## $$attrs/$$listeners

https://juejin.cn/post/6982727094937583647

# keep-alive

https://juejin.cn/post/6967268351835897892

keep-alive包裹的组件会多两个生命周期函数，actived和deactived

第一次创建组件 actived会在mounted之后执行，deactived会在销毁组件时执行，但是，不是真的执行了销毁，将不再执行销毁beforeDestroyed和destroyed而是缓存在内存中。

# Class和Style如何动态绑定

Class 可以通过对象语法和数组语法进行动态绑定：

 

* 对象语法：
 

```javascript
<div v-bind:class="{ active: isActive, 'text-danger': hasError }"></div>

data: {
  isActive: true,
  hasError: false
}
```
* 数组语法：
 

```javascript
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>

data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```
Style 也可以通过对象语法和数组语法进行动态绑定：
 

* 对象语法：
 

```javascript
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>

data: {
  activeColor: 'red',
  fontSize: 30
}
```
* 数组语法：
 

```javascript
<div v-bind:style="[styleColor, styleSize]"></div>

data: {
  styleColor: {
     color: 'red'
   },
  styleSize:{
     fontSize:'23px'
  }
}
```

# 理解Vue单向数据流

所有的 prop 都使得其父子 prop 之间形成了一个**单向下行绑定**：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解。

 额外的，每次父级组件发生更新时，子组件中所有的 prop 都将会刷新为最新的值。这意味着你不应该在一个子组件内部改变 prop。如果你这样做了，Vue 会在浏览器的控制台中发出警告。子组件想修改时，只能通过 $emit 派发一个自定义事件，父组件接收到后，由父组件修改。

## 有两种常见的试图改变一个 prop 的情形 :

 

* **这个 prop 用来传递一个初始值；这个子组件接下来希望将其作为一个本地的 prop 数据来使用。** 在这种情况下，最好定义一个本地的 data 属性并将这个 prop 用作其初始值：
 

```javascript
props: ['initialCounter'],
data: function () {
  return {
    counter: this.initialCounter
  }
}
复制代码
```
* **这个 prop 以一种原始的值传入且需要进行转换。** 在这种情况下，最好使用这个 prop 的值来定义一个计算属性
 

```plain
props: ['size'],
computed: {
  normalizedSize: function () {
    return this.size.trim().toLowerCase()
  }
}
```
# computed 和 watch 的区别和运用的场景

**computed：** 是计算属性，依赖其它属性值，并且 computed 的值有缓存，只有它依赖的属性值发生改变，下一次获取 computed 的值时才会重新计算 computed  的值；

 

**watch：** 更多的是「观察」的作用，类似于某些数据的监听回调 ，每当监听的数据变化时都会执行回调进行后续操作；

 

**运用场景：**

 

*  当我们需要进行数值计算，并且依赖于其它数据时，应该使用 computed，因为可以利用 computed 的缓存特性，避免每次获取值时，都要重新计算； 
*  当我们需要在数据变化时执行异步或开销较大的操作时，应该使用 watch，使用 watch 选项允许我们执行异步操作 ( 访问一个 API )，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。
# nextTick

[https://segmentfault.com/a/1190000012861862](https://segmentfault.com/a/1190000012861862)

应用

* 可以在created里面操作dom

# 


 

