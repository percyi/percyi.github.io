---
layout: post
title:  angularjs一些简答题
date:   2016-01-19 12:13:00 +0800
categories: blog
tag: Angularjs
---

* content
{:toc}


Angular.js一些简答题
===

总结的一些angularjs的简答题，希望对大家学习angular有所帮助。

**1、angularjs的几大特性是什么？**

- 双向数据绑定

- 模块化和复用

- mvc模式

- 指令系统


**2、列举几种常见的设计模式，写出每个代表的含义？**

1. mvc模式

2. 观察者模式

3. 单例模式

4. 工厂方法模式

5. 封装

6. 继承

7. 原型模式

8. 代理模式








**3、请描述angularjs的运行过程？**

1. 启动阶段：引入angularjs，浏览器解析到该script标签，停止解析，开始执行angular.js。同时Angular会设置一个事件监听器来监听浏览器DOMContentLoaded事件。当Angular监听到这个事件时，就会启动Angular应用。

2. 初始化阶段：Angular开始启动后，它会查找ng-app指令，然后初始化一系列必要的组件（即$injector、$compile服务以及$rootScope），接着重新开始解析DOM树。

3. 编译链接阶段：$compile遍历dom树搜集指令并且排序（基于指令的优先级排序）。然后使用$injector服务查找搜集compile函数并执行，每个节点的编译方法运行之后，$compile服务就会调用链接函数，这个链接函数为绑定了封闭作用域的指令设置监控，这一行为会创建实时视图。$compile服务完成之后，angular就准备运行。

4. 运行阶段：脏检查，执行$digest循环。检测到值得变化，调用$watch函数，再次执行$digest,直到值不再改变。

>angular本身有自己的事件循环，指令自身会注册事件监听器，因此当事件被触发的时候，指令函数就会运行在$digest循环中。$digest循环会等待$watch表达式列表，当检测到模型变化后，就会调用$watch函数，然后再次查看$watch列表以确保没有模型被改变


**4、ng-bind和ng-model的区别是什么？**

- ng-model 支持的是数据双向绑定，即$scope<->view双向数据绑定

- ng-bind 单向数据绑定，即$scope->view和{{express}}，仅仅是用于展示scope内的数据。

**5、请描述$scope的特点还有其最大的父类？**

- $scope提供APIs($watch)来观察模型的变化。

- $scope提供APIs($apply)讲任何模型的变化，从angular映射到视图层。

- $scope通过共享模型成员的方式嵌套在应用组件上，一个$scope可以从父级继承属性。

- $scope提供表达式执行的上下文，即{{express}}的执行环境就是$scope，{{express}}本身是没有任何意义的，除非把它放在$scope内


**6、原生js的延迟或回调在angularjs里能完美运行吗？怎么解决？可以用例子？**

>不能，在$scope内调用$scope上的$scope.$apply方法，讲变化映射到视图上。




**7、
```javascript
{{array | filter:23:true}}
```

这个过滤里的true是什么意思?

>true表示严格匹配过滤,并不是匹配属性值是否包含过滤条件,而是必须===全等,大小写也严格区分.


**8、自定义过滤创建后返回的是一个什么对象？**

函数对象 正则表达式







**9、ng-repeat循环[1,3,2,4,3,4]数组会报错吗？如果会怎么解决？**


>会报错，会提示 Duplicates in a repeater are not allowed. 加 track by $index 可解决。当然，也可以 trace by 任何一个普通的值，只要能唯一性标识数组中的每一项即可（建立 dom 和数据之间的关联









**10、angular常用的服务中value和constant最大的区别是什么？**

- constant注册的是静态值（常量），它可以再config（配置阶段）注入，注册的值是全局的,不能修改

```javascript
angular.module('myApp',[]).constant('name','qingyun')
```

- value不能在config阶段注入，注册的值可以修改。

**11、常用服务中factory和service的最大区别是什么？**

- factory:把 service 的方法和数据放在一个对象里，并返回这个对象

```javascript
angular.module('app',[]).factory('FooService', function(){
    //最后一个参数是工厂方法，返回的是一个对象。
    return {
        target: 'factory',
        sayHello: function(){
            return 'hello ' + this.target;
        }
    }
});
```
- service:通过构造函数方式创建 service。


```javascript
angular.module('app',[]).service('FooService', function(){
    //最后一个参数是构造函数。
    var self = this;
    this.target = 'service';
    this.sayHello = function(){
        return 'hello ' + self.target;
    }
});
```

**12、怎么拦截服务？**


>在angularjs中可以注册服务，还有一种被称为装饰器的东西，由$provider提供，他可以在服务实例创建时对其进行拦截，因此可以服务进行扩展





**13、decorator的作用是什么？和拦截服务的区别是什么？**


- decorator是一种设计模式，作用就是在不改动一个类的代码或者破坏一个类的接口的情况下为该类添加功能。
- $provider.decorator()方法拦截服务，并修改，除constant之外的服务都可以拦截修改。








**14、请写一个配置路由的代码段（只需要写怎么声明一个路由和其常用属性的代码段）**


```javascript
$stateProvider
    .state('home', {
        abstract: true,
        url: '/index',
        templateUrl: 'tempUrl',
        resolve: {},
        controller：myCtrl
    });

```



**15、resolve的作用是什么？**

>resolve在state配置参数中，是一个对象(key-value)，每一个value都是一个可以依赖注入的函数，并且返回的是一个promise(当然也可以是值，resloved defer)。我们通常会在resolve中，进行数据获取的操作，然后返回一个promise，

>简化了controller的操作，将数据的获取放在resolve中进行，这在多个视图多个controller需要相同数据时，有一定的作用。

- 只有当reslove中的promise全部resolved(即数据获取成功)后，才会触发'$stateChangeSuccess'切换路由，进而实例化controller，然后更新模板。

**16、ngRoute默认查找的路由是什么？
$routeProvider.otherwise(’/index’)是什么作用？**

- ngRoute默认查找的路由是根路由

- $routeProvider.otherwise('/index').设置路由定义。当用户访问的路由没有匹配到（没有找到该路由）的时候，使用index路由


**17、$location.path(‘/home’)和$location.url(‘/home’)都可以进行路由跳转，但是.path方法和.url方法最大的区别是什么？**

- .url做路由跳转会修改当前url（包括path,search,hash）

- .path做路由跳转只会改变url中的path

**18、什么是跨域，请简要描述跨域的场景？**

- 跨域：由于浏览器的同源策略，即属于不同域的页面之间不能相互访问各自的页面内容。

*跨域的场景：*

1. 域名不同  （www.yangwei.com 和www.wuyu.com 即为不同的域名）

2. 二级域名相同，子域名不同    （www.wuhan.yangwei.com www.shenzheng.yangwei.com 为子域不同）

3. 端口不同，协议不同（ http://www.yangwei.com 和https://www.yangwei.com属于跨域www.yangwei.con:8888和www.yangwei.con:8080)


**19、常使用的跨域方案就哪两种？分别描述其利用的原理？**

- 通过JSONP跨域
		动态插入script标签，通过script标签引入一个js文件，这个js文件载入成功后会执行我们在url参数中指定的函数，并且会把我们需要的json数据作为参数传入。

- 通过修改document.domain来跨子域

      将子域和主域的document.domain设为同一个主域.前提条件：这两个域名必须属于同一个基础域名!而且所用的协议，端口都要一致，否则无法利用document.domain进行跨域主域相同的使用document.domain





**20、请写出$http网络请求的几种写法，最少两种**

* $http.get
* $http.head
* $http.post
* $http.put
* $http.delete
* $http.jsonp
* $http.patch