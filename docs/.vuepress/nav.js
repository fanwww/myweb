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
          { text: 'JavaScript', link: '/notes/js/js_1' },
        ]
      },
      {
        text:'入门',
        items:[
          { text: 'ES6', link: '/notes/es6/es6' },
          { text: 'Sass', link: '/notes/sass/about' },
          { text: 'TypeScript', link: '/notes/ts/ts_install' },
          { text: 'axios', link: '/notes/axios/axios' },
        ]
      },
      {
        text:'框架',
        items:[
          { text: 'Vue', link: '/notes/vue/vue' },
          { text: 'React', link: '/notes/react/react_base' },
        ]
      },
      {
        text:'其他',
        items:[
          { text: '微信小程序', link: '/notes/wx_mini_p/life_cycle' },
        ]
      }
    ],
  },
  {
    text: '前端进阶',
    items: [
      {
        text:'WebRTC',
        items:[
          { text: 'WebRTC基础', link: '/fontendAdvance/WebRTC/web_rtc_1' },
        ]
      },
      {
        text:'前端可视化',
        items:[
          { text: 'SVG', link: '/fontendAdvance/svg/svg_1' },
          { text: 'ECharts', link: '/fontendAdvance/echarts/echarts_1' },
          { text: 'Handsontable', link: '/fontendAdvance/handsontable/handsontable_1' },
        ]
      },
      {
        text:'前端工程化',
        items:[
          { text: '打包基础', link: '/fontendAdvance/pack_base/rollup&webpack' },
          { text: 'webpack', link: '/fontendAdvance/webpack/webpack' },
          { text: 'vite', link: '/fontendAdvance/vite/vite' },
        ]
      }
    ]
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
      { text: 'Python', link: '/other/python/crawler' }
    ]
  }
]