import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const CommonHeader = _ => import('@/components/common/common_header')
const BookTag = _ => import('@/components/book/book_tag')
const BookTagContent = _ => import('@/components/book/book_tag_content')
const BookTagMoreContent = _ => import('@/components/book/book_tag_more_info')
const BookTypeContent = _ => import('@/components/book/book_type_content')

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/book_tag'
    },
    {
      path: '/book_tag',
      name: 'bookTag',
      components: {
        default: CommonHeader,
        aside: BookTag,
        content: BookTagContent
      }
    },
    {
      path: '/book_type',
      name: 'bookType',
      components: {
        default: CommonHeader,
        content: BookTypeContent
      }
    },
    {
      path: '/book_tag_more_info',
      name: 'bookTagMoreInfo',
      components: {
        default: CommonHeader,
        aside: BookTag,
        content: BookTagMoreContent
      }
    }
  ]
})
