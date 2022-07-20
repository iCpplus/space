---
title: 测试
date: "2022-07-20T18:00:32.169Z"
description: css笔记 看完就学会了css 成功成为合格的切图25仔
tags: ['css','前端样式','style']
disqus: true
---

# 盒模型

盒模型的组成，由里向外content,padding,border,margin.

**在IE盒子模型中，width表示content+padding+border这三个部分的宽度**

**在标准的盒子模型中，width指content部分的宽度**

box-sizing的使用

```css
box-sizing: content-box 是W3C盒子模型
box-sizing: border-box 是IE盒子模型
```

box-sizing的默认属性是content-box

# margin负边距

[https://juejin.cn/post/7025880293013716999](https://juejin.cn/post/7025880293013716999)

## 盒子塌陷是什么

为什么会出现盒子塌陷？ 当父元素没设置足够大小的时候，而子元素设置了浮动的属性，子元素就会跳出父元素的边界（脱离文档流），尤其是当父 w的高度为auto时，而父元素中又没有其它非浮动的可见元素时，父盒子的高度就会直接塌陷为零， 我们称这是*CSS高度塌陷*。

# margin padding

* margin和padding设置一个参数时：上右下左都对应这个参数 margin和padding
* 设置两个参数时：上下对应第一个参数，左右对应第二个参数 margin和padding
* 设置三个参数时：上对应第一个参数，左右对应第二个参数，下对应第三个参数 margin和padding
* 设置四个参数时：上对应第一个参数，右对应第二个参数，下对应第三个参数，左对应第四个参数
# css隐藏元素

**display:none、visibility:hidden、opacity:0**

* **display:none 隐藏不占据位置**
* **hidden 隐藏占据位置**
* **opacity 透明，占据位置并且可以触发点击事件**


# 居中

https://juejin.cn/post/6844903919144075278

**水平居中**

* 行内元素: `text-align: center`
* 块级元素: `margin: 0 auto`
* position:absolute +left:50%+ transform:translateX(-50%)
* `display:flex + justify-content: center`
**垂直居中**

* 设置line-height 等于height
* position：absolute +top:50%+ transform:translateY(-50%)
* `display:flex + align-items: center`
* display:table+display:table-cell + vertical-align: middle;
**垂直水平居中**

//不知道宽高

```css
  width: 78px;
  height: 78px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
```

//知道宽高

```css
        height: 100px;
        width: 100px;
        position: absolute;
        left:50%;
        top: 50%;
        margin-left: -50px;
        margin-top: -50px;
        display:flex;
        justify-content: center;
        align-content: center;
```

# flex布局

http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html

`flex`属性是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`。后两个属性可选。

> `css
> .item {
>   flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
> }
> `
该属性有两个快捷值：`auto` (`1 1 auto`) 和 none (`0 0 auto`)。

建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

# BFC

https://juejin.cn/post/6950082193632788493

## BFC到底是什么东西

`BFC` 全称：`Block Formatting Context`， 名为 "块级格式化上下文"。

`W3C`官方解释为：`BFC`它决定了元素如何对其内容进行定位，以及与其它元素的关系和相互作用，当涉及到可视化布局时，`Block Formatting Context`提供了一个环境，`HTML`在这个环境中按照一定的规则进行布局。

简单来说就是，`BFC`是一个完全独立的空间（布局环境），让空间里的子元素不会影响到外面的布局。那么怎么使用`BFC`呢，`BFC`可以看做是一个`CSS`元素属性

## 怎样触发BFC

这里简单列举几个触发`BFC`使用的`CSS`属性

* overflow: hidden
* display: inline-block
* position: absolute
* position: fixed
* display: table-cell
* display: flex
## BFC的规则

* `BFC`就是一个块级元素，块级元素会在垂直方向一个接一个的排列
* `BFC`就是页面中的一个隔离的独立容器，容器里的标签不会影响到外部标签
* 垂直方向的距离由margin决定， 属于同一个`BFC`的两个相邻的标签外边距会发生重叠
* 计算`BFC`的高度时，浮动元素也参与计算
# 两栏布局 三栏布局

https://juejin.cn/post/6844904062224171021

https://juejin.cn/post/6844903491446505480

# Rem、vw、vh、%响应式布局

https://juejin.cn/post/6844903630655471624

https://juejin.cn/post/6844903607347707918


# :first-child选择器

#### 如果加空格 div :first-child，那么就选择的是div的第一个孩子元素（会向下递归，例如也会选择到div的第一个孩子的第一个孩子），为了阻止递归，可以使用子元素选择器， div > :first-child

#### 如果不加空格 div:first-child,那么选择的是div父元素的第一个div元素



