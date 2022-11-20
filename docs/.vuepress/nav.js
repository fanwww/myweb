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
          { text: 'HTML&CSS', link: '/notes/html&css/form' },
          { text: 'JavaScript', link: '/notes/js/what_is_js' },
        ]
      },
      {
        text:'进阶',
        items:[
          { text: 'Sass', link: '/notes/sass/about' },
          { text: 'TypeScript', link: '/notes/ts/ts_install' },
          { text: 'ES6', link: '/notes/es6/es6' },
          { text: 'AJAX', link: '/notes/ajax/AJAX' },
        ]
      },
      {
        text:'框架',
        items:[
          { text: 'axios', link: '/notes/axios/axios' },
          { text: 'Vue', link: '/notes/vue/vue' },
        ]
      },
      {
        text:'移动端',
        items:[
          { text: '微信小程序', link: '/notes/微信小程序/life_cycle' },
        ]
      }
    ],
  },
  {
    text: '后端',
    items: [
      { text: 'Nodejs', link: '/backend/nodejs/node' },
      { text: 'MySql', link: '/backend/mysql/mysql_note' },
    ]
  },
  {
    text:'其他',
    items:[
      { text: 'Git', link: '/other/git/Git' },
      { text: '正则表达式', link: '/other/reg/reg' },
      { text: 'webpack', link: '/other/webpack/webpack' },
      { text: 'Python', link: '/other/python/crawler' }
    ]
  }
]