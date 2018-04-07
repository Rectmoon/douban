<template>
  <aside class='asside_wrapper'>
    <h2 class='aside_top'>标签列表</h2>
    <ul class="book_tag_list">
      <li v-for='(bookTag,i) in bookTags' :key='i' class='book_tag_item' :class="{'book_active_tag_item': bookTag === currentBookTags}" @click='h_change_current_book_tags(bookTag)'>
        {{bookTag.tagName}}
      </li>
    </ul>
    <ul>
      <li v-for='(subTag,i) in currentBookTags.subTags' :key='i' class='aside_item' :class="{'book_active_subtag_item': subTag === currentBookTag}" @click='h_change_current_tag(subTag)'>
        {{subTag}}
      </li>
    </ul>
  </aside>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters(['bookTags', 'currentBookTags', 'currentBookTag', 'tagBooks'])
  },
  methods: {
    h_change_current_book_tags (bookTag) {
      this.$store.commit('SET_CURRENT_BOOK_TAGS', bookTag)
      this.$store.commit('SET_CURRENT_BOOK_TAG', bookTag.subTags[0])
      if (!this.tagBooks[bookTag.subTags[0]]) {
        this.getCurrentTagBooks({count: 40})
      } else {
        this.$store.commit('SET_CURRENT_TAG_BOOKS', {
          books: this.tagBooks[bookTag.subTags[0]]
        })
      }
    },
    h_change_current_tag (subTag) {
      this.$store.commit('SET_CURRENT_BOOK_TAG', subTag)
      if (!this.tagBooks[subTag]) {
        this.getCurrentTagBooks({count: 40})
      } else {
        this.$store.commit('SET_CURRENT_TAG_BOOKS', {
          books: this.tagBooks[subTag]
        })
      }
    },
    ...mapActions(['getCurrentTagBooks'])
  }
}
</script>
<style scoped lang='stylus'>
  .book_tag_list
    border-bottom 1px solid #eee
    padding 10px 0
    .book_tag_item
      display inline-block
      margin 5px 30px 3px 0
      padding 3px 5px
      font-size 12px
      color #37a
      cursor pointer
      &:hover
        color #09f
      &.book_active_tag_item
        background lightblue
        color #fff
  .book_active_subtag_item
    background #f6f6f1
</style>
