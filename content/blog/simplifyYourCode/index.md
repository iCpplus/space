---
title: 让代码简洁语义化
date: "2022-07-22T14:00:32.169Z"
description: es5语法之后，新语法使我们的代码更简洁语义化，即使语法都已掌握，但日常开发仍然不去使用...
tags: ['js','代码优化']
disqus: true
---

## 取值

```javascript
const obj = {
  a:'a',
  b:'b',
  c:'c'
}
```
不推荐：
```javascript
const a = obj.a
const b = obj.b
const newName = obj.c
```
推荐：
```javascript
const {a,b,c:newName} = obj //对象解构赋值
```
注意：
```javascript
//解构赋值语法从null，undefined结构会报错。如果不确定可以如下操作
const {a,b,c:newName} = obj || {}
```

## 合并数据

```javascript
const arr1 = [1,2,3]
const arr2 = [4,5,6]
const obj1 = {a:'a'}
const obj2 = {b:'b'}
```
不推荐：
```javascript
const arr = arr1.concat(arr2)
const obj = Object.assign(obj1,obj2)
```
推荐：
```javascript
const arr = [...arr1,...arr2]
const arrs = [...new Set([...arr1,...arr2])] //去重
const obj = {...obj1,...obj2}
```

## 拼接字符串

```javascript
const name = '小明';
const score = 59;
```
不推荐：
```javascript
let result = '';
if(score > 60){
  result = `${name}的考试成绩及格`; 
}else{
  result = `${name}的考试成绩不及格`; 
}
```
推荐：
```javascript
const result = `${name}${score > 60?'的考试成绩及格':'的考试成绩不及格'}`;
```

## 条件判断

不推荐：

```javascript
if(
    type == 1 ||
    type == 2 ||
    type == 3 ||
    type == 4 ||
){
   //...
}
```
推荐：
```javascript
const condition = [1,2,3,4];
if( condition.includes(type) ){
   //...
}
```

## 异步函数

不推荐：

```javascript
const fn1 = () =>{
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
    }, 300);
  });
}
const fn2 = () =>{
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2);
    }, 600);
  });
}
const fn = () =>{
   fn1().then(res1 =>{
      console.log(res1);// 1
      fn2().then(res2 =>{
        console.log(res2)
      })
   })
}
```
推荐：
```javascript
const fn = async () =>{
  const res1 = await fn1();
  const res2 = await fn2();
  console.log(res1);// 1
  console.log(res2);// 2
}
```

## 
