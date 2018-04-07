<template>
  <div class="left_content">
    <div class="content_header">
      <h2 class='inlineBlock'>豆瓣读书标签:{{currentBookTag}}</h2>
    </div>
    <ul>
      <li v-for='book in currentShowTagBooks' :key='book.id' class='book_item'>
        <a :href="book.alt" :title='book.title'>
          <img v-lazy="book.images.large" :alt="book.title" class='book_img fl'>
        </a>
        <div class="book_info">
          <h3 class="link_title"><a :href="book.alt">{{book.title}}</a></h3>
          <p class="book_other_info">
            {{book.author.join()}} / {{book.translator.join()}} / {{book.publisher}} / {{book.pubdate}} / {{book.price}}
          </p>
          <div>
            <span class="score_img" :style='getStarStyle(book.rating.average)'></span>
            <span class="average_score">{{book.rating.average}}</span>
            <span class="raters_num">({{book.rating.numRaters}}人评价)</span>
          </div>
          <p class="book_summary">{{book.summary | limitedSummary(80)}}</p>
          <div>
            <a :href="book.alt" class='buy_books'>去豆瓣购买</a>
            <a :href="book.ebook_url" class='e_book fr'>去看电子版</a>
          </div>
        </div>
      </li>
    </ul>
    <a href="javascript:void(0)" @click='h_load_more_books' class='more_books'>加载更多</a>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1652783556,2383056985&fm=200&gp=0.jpg',
  loading: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523120544336&di=c1e75b786a30793f58ac92fa426f0525&imgtype=0&src=http%3A%2F%2Fs8.rr.itc.cn%2Fg%2FwapChange1%2F20156_2_9%2Fa5e5030733038308663.gif',
  attempt: 1,
  listenEvents: [ 'scroll' ]
})
export default {
  mounted () {
    if (!this.currentShowTagBooks.length) this.getCurrentTagBooks({count: 10})
  },
  data () {
    return {
      bookCountPerPage: 10
    }
  },
  computed: {
    ...mapGetters(['currentBookTag', 'currentTagBooks']),
    currentShowTagBooks () {
      return this.currentTagBooks.slice(0, this.bookCountPerPage)
    }
  },
  methods: {
    ...mapActions(['getCurrentTagBooks']),
    getStarStyle (n) {
      return this.util.getStarStyle(n)
    },
    h_load_more_books () {
      let bookCount = this.currentTagBooks.length
      this.bookCountPerPage += 10
      if (bookCount < this.bookCountPerPage) {
        this.getCurrentTagBooks({count: 10, start: bookCount, type: 'merge'})
      }
    }
  },
  filters: {
    limitedSummary (str, n) {
      return str.length >= n ? str.substring(0, n) + '...' : str
    }
  }
}
</script>

<style scoped lang='stylus'>
  .book_item
    padding 15px 0
    border-bottom 1px solid #ddd
    overflow hidden
    zoom 1
    .book_img
      width 90px
      height 128px
      margin-right 20px
    .book_info
      overflow hidden
      zoom 1
      .book_other_info
        margin 6px 0 8px
        font-size 14px
      .average_score
        color #e09015
      .raters_num
        margin-left 6px
      .book_summary
        font-size 12px
        margin 12px 0 10px
        line-height 1.6
      .buy_books
        color #37a
        &:hover
          color #fff
          background #37a
      .e_book
        color #973f31
        &:hover
          color #fff
          background #973f31
.more_books
  display block
  height 34px
  line-height 34px
  margin-top 15px
  text-align center
  background #f6f6f1
  color #37a
</style>
