<template>
  <div class='left_content'>
    <div class="content_header">
      <h2 class='inlineBlock'>{{currentBookTag}}</h2>
      <router-link to='book_tag_more_info' class='common_link'>更多</router-link>
      <CommonSlide
        class='book_content_tag_slide fr'
        :pageCount='pageCount'
        :currentPage="currentPage"
        backgroundColor='lightblue'
        @chage_page='h_change_page'
        @chage_direction='h_chage_direction'
      />
    </div>
    <transition-group tag='div' class='book_tag_content' :enter-active-class="enterActiveClass" name='slide' :leave-active-class="leaveActiveClass">
      <ul v-for='(books,i) in splicedBooks' :key='i' class='book_tag_content_list'
       ref='bookList' v-show='i===currentPage' >
        <li v-for='(book, j) in books' :key='j' class='inlineBlock'>
          <a :href="book.alt" :title='book.title'>
            <img :src="book.images.large" :alt="book.title" class='book_tag_content_img'
            @mouseenter='h_show_book_prompt(book, j)' @mouseleave='h_hide_book_prompt()'>
          </a>
          <h3 class='link_title'><a :href="book.alt" :title='book.title'>{{book.title}}</a></h3>
          <p class="book_tag_content_author">{{book.author.join()}}</p>
        </li>
      </ul>
    </transition-group>
    <div class="book_tag_content_prompt" v-if='loadPrompt' v-show='showPrompt' :style='promptStyle'>
      <span class="outside_triangle"></span>
      <span class="inside_triangle"></span>
      <h3 class="prompt_title">{{currentBookPrompt.title}}</h3>
      <p class="prompt_introduce">
        {{currentBookPrompt.author.join()}}    /
        {{currentBookPrompt.pubdate}}    /
        {{currentBookPrompt.publisher}}    /
      </p>
      <p class="prompt_summary">
        {{currentBookPrompt.summary | limitedSummary(160)}}
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CommonSlide from '@/components/common/common_slide'
export default {
  mounted () {
    if (this.currentTagBooks.length < 40) this.getCurrentTagBooks({count: 40})
  },
  data () {
    return {
      currentPage: 0,
      sildeDirection: 'right',
      loadPrompt: false,
      showPrompt: false,
      contentPosition: null,
      promptStyle: null,
      currentBookPrompt: null
    }
  },
  computed: {
    pageCount () {
      return Math.ceil(this.currentTagBooks.length / 10)
    },
    ...mapGetters(['bookTags', 'currentBookTags', 'currentBookTag', 'tagBooks', 'currentTagBooks']),
    splicedBooks () {
      return this.util.spliceArr(this.currentTagBooks, 10)
    },
    enterActiveClass () {
      return this.sildeDirection === 'right' ? 'animated fadeInRight' : 'animated fadeInLeft'
    },
    leaveActiveClass () {
      return this.sildeDirection === 'right' ? 'animated fadeOutLeft' : 'animated fadeOutRight'
    }
  },
  methods: {
    h_change_page (page) {
      this.currentPage = page
    },
    h_chage_direction (direction) {
      this.sildeDirection = direction
    },
    getContentPosition () {
      let rect = this.$refs.bookList[0].getBoundingClientRect()
      return (
        {
          width: rect.width,
          height: rect.height,
          left: rect.left,
          top: rect.top
        }
      )
    },
    h_show_book_prompt (book, n) {
      if (!this.contentPosition) this.contentPosition = this.getContentPosition()
      this.currentBookPrompt = book
      let {width, height, left, top} = this.contentPosition
      width = width * 0.2
      height = height * 0.5
      left = n % 5 * width + width
      top = n < 5 ? top - 10 : top + height - 10
      this.promptStyle = {
        top: top + 'px',
        marginLeft: left + 'px'
      }
      if (!this.loadPrompt) {
        this.loadPrompt = true
      }
      this.showPrompt = true
    },
    h_hide_book_prompt () {
      this.showPrompt = false
    },
    ...mapActions(['getCurrentTagBooks'])
  },
  filters: {
    limitedSummary (str, n) {
      return str.length >= n ? str.substring(0, n) + '...' : str
    }
  },
  components: {
    CommonSlide
  }
}
</script>

<style scoped lang='stylus'>
  .common_link
    margin-left 10px
  .book_tag_content
    width 100%
    height 489px
    font-size 14px
    position relative
    margin-top 10px
    overflow hidden
    .book_tag_content_list
      width 100%
      height 100%
      position absolute
      li
        width 20%
        height 50%
        text-align center
        vertical-align top
        .book_tag_content_img
          width 85%
          height 70%
        .book_tag_content_author
          margin 0 0 6px 0
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
  .book_tag_content_prompt
    width 330px
    max-height 220px
    position absolute
    background lightblue
    border 1px solid #cccccc
    border-radius 5px
    box-sizing border-box
    padding 10px
    box-shadow  0 1px 1px #fdfdfd inset, 0 1px 1px #dcdbd4
    transition all .3s ease
    span
      position absolute
      width 0
      height 0
      top 45%
      border-top 8px solid transparent
      border-bottom 8px solid transparent
      &.outside_triangle
        border-right 8px solid #acacac
        left -8px
      .inside_triangle
        border-right 8px solid #f9f9f7
        left -7px
    .prompt_title
      font-size 14px
      margin-bottom 6px
      color #666
    .prompt_introduce
      font-size 12px
      margin-bottom 6px
    .prompt_summary
      max-height 130px
      font-size 12px
      line-height 1.6
</style>
