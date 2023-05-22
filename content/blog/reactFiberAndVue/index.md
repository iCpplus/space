---
title: 为什么没有vue fiber
date: "2022-11-28T17:00:32.169Z"
description: react实现了fiber架构，为什么react需要该架构，vue却没有选择fiber架构呢。
tags: ['React','vue']
disqus: true
relative: false
cover: https://img.picgo.net/2023/05/22/F62693A5EC4421E93510138A6D5FFB12d6e014626935f6e4.jpeg
---

## vue为什么不需要fiber架构

react和vue的响应式实现原理不同。数据更新时，vue因为通过模板语法的编译优化进行依赖收集，可以精准确定模板中使用响应式变量的位置，进而diff该处片段更新该处视图。而react使用的JSX语法，没办法做到在编译期间进行优化，只能把更多的优化放在运行时，在数据更新时，react会生成一个更大的虚拟dom树，给接下来的diff带了更大的压力，

![](images/2022-11-28-14-19-44.png)