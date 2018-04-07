<template>
  <div>
    <ol class='slide_dots inlineBlock'>
      <li v-for='page in pageCount' :key='page' class='inlineBlock'>
        <a href="javascript:void(0)" :style="{background: h_active_page_style(page-1)}" @click='h_to_page(page-1)' class='inlineBlock'></a>
      </li>
    </ol>

    <div class="slide_buttons inlineBlock">
      <a href="javascript:void(0)" class='pre inlineBlock' :style="{background: backgroundColor}" @click='h_to_page(prePage, "left")'>‹</a>
      <a href="javascript:void(0)" class='next inlineBlock' :style="{background: backgroundColor}" @click='h_to_page(nextPage, "right")'>›</a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pageCount: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      default: 0
    },
    backgroundColor: {
      type: String,
      default: 'orange'
    }
  },
  data () {
    return {
      msg: 'hello lzx'
    }
  },
  computed: {
    prePage () {
      return this.currentPage === 0
        ? this.pageCount - 1
        : this.currentPage - 1
    },
    nextPage () {
      return this.currentPage === this.pageCount - 1 ? 0 : this.currentPage + 1
    }
  },
  methods: {
    h_active_page_style (n) {
      return n === this.currentPage ? this.backgroundColor : ''
    },
    h_to_page (n, direction) {
      let zoom
      if (direction) {
        zoom = direction
      } else {
        zoom = n < this.currentPage ? 'left' : 'right'
      }
      this.$emit('chage_page', n)
      this.$emit('chage_direction', zoom)
    }
  }
}
</script>

<style scoped lang='stylus'>
  .slide_dots
    li
      a
        width 5px
        height 5px
        margin-left 8px
        border-radius 5px
        background #dfdfdf
  .slide_buttons
    vertical-align top
    a
      width 18px
      height 18px
      text-align center
      line-height 16px
      margin-left 3px
      font-weight bold
      border-radius 9px
      color #fff
      font-size 16px
</style>
