<template>
  <div class='book_type_content'>
    <div class="content_header">
      <h2>最受欢迎图书榜</h2>
      <a href="javascript:void(0)" v-for='(bookType, i) in bookTypes' :key='i' class='book_type_link' :class="{active: bookType === currentBookType}" @click='h_change_book_type(bookType)'>{{bookType}}</a>
    </div>

    <ul class="book_list">
      <li v-for='book in currentTypeBooks' :key='book.id' class='book_item'>
        <a :href="book.alt" :title='book.title'>
          <img :src="book.images.large" :alt="book.title" class='book_img'>
        </a>
        <div class="book_more_info">
          <h3 class='link_title'>
            <a :href="book.title">{{book.title}}</a>
          </h3>
          <p>
            <span class='score_img' :style="h_get_book_star(book.rating.average)"></span>
            <span class="average_score">{{book.rating.average}}</span>
          </p>
          <p>作者 : {{book.author.join()}} </p>
          <p><span v-show='book.publisher'>{{book.publisher}} / </span>{{book.pubdate}} </p>
          <p class="book_details"><span v-show='book.pages'>{{book.pages}}页 /</span> <span v-show='book.price'>{{book.price}}元 /</span> <span v-show='book.binding'>{{book.binding}}</span></p>
          <p>标签 : {{h_get_book_tags(book.tags)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  mounted () {
    if (!this.currentTypeBooks.length) this.getTypeBooks({count: 12})
  },
  computed: {
    ...mapGetters(['bookTypes', 'currentBookType', 'currentTypeBooks', 'typeBooks'])
  },
  methods: {
    h_change_book_type (bookType) {
      this.$store.commit('SET_CURRENT_BOOK_TYPE', bookType)
      if (!this.typeBooks[bookType]) {
        this.getTypeBooks({count: 12})
      } else {
        this.$store.commit('SET_CURRENT_TYPE_BOOKS', this.typeBooks[bookType])
      }
    },
    h_get_book_star (n) {
      return this.util.getStarStyle(n)
    },
    h_get_book_tags (tags) {
      return tags.reduce((pre, next, index, arr) => {
        return `${pre}${(index === arr.length || index === 0) ? '' : ' / '}${next.name}`
      }, '')
    },
    ...mapActions(['getTypeBooks'])
  }
}
</script>

<style scoped lang='stylus'>
  .book_type_content
    width 100%
    font-size 12px
    h2
      margin-bottom 4px
    .book_type_link
      margin-left 10px
      font-weight normal
      font-size 12px
      color #37a
      cursor pointer
      &:hover
        color #09f
      &.active
        background lightblue
        color #fff
    .book_list
      display flex
      flex-wrap wrap
      justify-content space-around
      margin-top 20px
      .book_item
        width 310px
        margin-bottom 30px
        overflow hidden
        .book_img
          width 95px
          height 137px
          margin-right 18px
        .book_more_info
          p
            margin 3px 0
            overflow hidden
            text-overflow: ellipsis
            white-space nowrap
            &.book_details
              height 30px
              line-height 30px
            .average_score
              color #e09015
</style>
