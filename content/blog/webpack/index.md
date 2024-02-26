---
title: webpack初体验
date: "2024-02-26"
description: 记录学习下webpack...
tags: ['webpack','前端工程化']
disqus: true
relative: false
cover: https://img.picgo.net/2024/02/26/webpack9d9f31065d76cbbb.png
---

## 写在前面

从毕业到现在已经一年多的时间了，在日常的开发中或多或少接触过webpack，但没有系统的学习过webpack，是时候着手学习一下webpack了，对前端工程化的了解更进一步。

## 什么是webpack

本质上，webpack 是一个用于现代 JavaScript 应用程序的 静态模块打包工具。当 webpack 处理应用程序时，它会在内部从一个或多个入口点构建一个 依赖图(dependency graph)，然后将你项目中所需的每一个模块组合成一个或多个 bundles，它们均为静态资源，用于展示你的内容。

## 核心

* entry
* output
* loader
* plugin

## 基本构建流程

Webpack 的运⾏流程是⼀个串⾏的过程，从启动到结束会依次执⾏以下流程：

初始化参数：解析webpack配置参数，合并shell传入和webpack.config.js文件配置的参数，形成最后的配置结果。
开始编译：上一步得到的参数初始化compiler对象，注册所有配置的插件，插件监听webpack构建生命周期的事件节点，做出相应的反应，执行对象的 run 方法开始执行编译。
确定入口：从配置的entry入口，开始解析文件构建AST语法树，找出依赖，递归下去。
编译模块：递归中根据文件类型和loader配置，调用所有配置的loader对文件进行转换，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理。
完成模块编译：在经过第4步使⽤ Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
输出资源：根据⼊⼝和模块之间的依赖关系，组装成⼀个个包含多个模块的 Chunk，再把每个 Chunk 转换成⼀个单独的⽂件加⼊到输出列表，这步是可以修改输出内容的最后机会；
输出完成：在确定好输出内容后，根据配置确定输出的路径和⽂件名，把⽂件内容写⼊到⽂件系统。

## 安装
```js
//全局安装
npm install -g webpack
npm install -g webpack-cli

//项目依赖
npm install --save-dev webpack
npm install --save-dev webpack-cli
```

## entry--入口

入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。

## output--出口

output 属性告诉 webpack 在哪里输出它所创建的 bundles。

## loader

loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理。

## plugin

webpack插件(自动打开浏览器、热更新等)。

## 