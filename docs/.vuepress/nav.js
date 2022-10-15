// .vuepress/nav.js
module.exports = [
  {
    text: 'Resources', link: '/resources/website/websites_recom'
  },
  {
    text: '前端',
    items: [
      {
        text:'基础',
        items:[
          { text: 'HTML&CSS', link: '/notes/html&css/表单属性' },
          { text: 'JavaScript', link: '/notes/js/what_is_js' },
        ]
      },
      {
        text:'进阶',
        items:[
          { text: 'Sass', link: '/notes/sass/1、相关介绍' },
          { text: 'ES6', link: '/notes/es6/Class' },
          { text: 'AJAX', link: '/notes/ajax/AJAX' },
        ]
      },
      {
        text:'框架',
        items:[
          { text: 'axios', link: '/notes/axios/axios基本配置' },
          { text: 'Vue', link: '/notes/vue/vue核心基础' },
        ]
      },
      {
        text:'移动端',
        items:[
          { text: '微信小程序', link: '/notes/微信小程序/小程序的生命周期' },
        ]
      }
    ],
  },
  {
    text: '后端',
    items: [
      { text: 'Nodejs', link: '/backend/nodejs/node' },
    ]
  },
  {
    text:'其他',
    items:[
      { text: 'Git', link: '/other/git/Git' },
      { text: 'webpack', link: '/other/webpack/webpack基础' },
      { text: 'Python', link: '/other/python/crawler' }
    ]
  }
]