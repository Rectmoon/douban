<template>
  <div class='header_wrapper' :style="{background: currentModuleType.backgroundColor}">
    <div class="header clearfix">
      <h2 class="search_logo fl" :class="currentModuleType.logo">{{currentModuleType.text}}</h2>
      <div class="search_target fl">
        <form action="" class="search_form">
          <input type="text" class="search_input" :placeholder="currentModuleType.placeholder" v-model="keyword" @blur='h_blur()' @focus='h_focus()'>
          <input type="submit" class="search_submit" value="搜索" :class='currentModuleType.searchIcon'>
        </form>
        <ul class="search_suggest" v-show='showSearchSuggest' @mouseenter='h_list_focus()' @mouseleave='h_list_blur()'>
          <li class="search_item" v-for="(item,i) in searchData" :key='i'>
            <a class='search_item_link' :href='item.alt'>
              <img :src="item.image ||item.images.small" class="search_item_img" referrerpolicy='no-referrer'>
              <h3 class="search_item_title">{{item.title}}</h3>
              <span v-if='item.pubdate'>{{item.pubdate}}</span>
              <span v-if='item.year'>{{item.year}}</span>
              <p v-if='item.author' class="search_item_author">{{item.author | theAuthor}}</p>
              <p v-if='item.genres' class="search_item_genres">{{item.genres.join()}}</p>
            </a>
          </li>
        </ul>
      </div>
      <ul class="module_list fl">
        <li v-for='type in moduleTypes' :key='type.value'>
          <span>{{type.text}}</span>
          <div class="more_module_wrapper">
            <div class="more_module">
              <router-link v-for='subType in type.subTypes' class='more_module_link' :key='subType.path' :to='subType.path'>
                {{subType.text}}
              </router-link>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'CommonHeader',
  mounted () {
    this.hashName = window.location.hash.replace(/#\/?/, '')
  },
  data () {
    return {
      hashName: '',
      keyword: '',
      timer: null,
      isFocusOnInput: false,
      isFocusOnList: false
    }
  },
  computed: {
    ...mapState(['moduleTypes', 'currentModuleType', 'searchData']),
    showSearchSuggest () {
      return (this.isFocusOnInput || this.isFocusOnList) && this.keyword !== '' && this.searchData.length !== 0
    }
  },
  filters: {
    theAuthor (v) {
      if (v[0] && v[0].name) {
        return (
          v.reduce((pre, next) => {
            return pre.name + next.name
          }, {name: ''})
        )
      }
      return v.join()
    }
  },
  methods: {
    ...mapActions(['getSearchData']),
    h_blur () {
      this.isFocusOnInput = false
    },
    h_focus () {
      this.isFocusOnInput = true
    },
    h_list_focus () {
      this.isFocusOnList = true
    },
    h_list_blur () {
      this.isFocusOnList = false
    }
  },
  watch: {
    'keyword' (v) {
      if (v !== '' && this.currentModuleType.value !== 'city') {
        if (this.timer) {
          clearTimeout(this.timer)
          this.timer = null
        } else {
          this.timer = setTimeout(_ => {
            this.timer = null
            this.getSearchData({keyword: v})
          }, 200)
        }
      }
    },
    'hashName' (v) {
      if (v.indexOf(this.currentModuleType.value) === -1) {
        this.moduleTypes.forEach(item => {
          if (v.indexOf(item.value) !== -1) {
            this.$store.commit('CHANGE_CURRENT_MODULE_TYPE', item)
            return true
          }
        })
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    this.keyword = ''
    this.$store.commit('SET_SEARCH_DATA', [])
    this.hashName = to.name
    next()
  }
}
</script>

<style scoped lang='stylus'>
 .header_wrapper
    width 100%
    min-width 936px
    margin-bottom 40px
    transition background .5s ease-in-out
    .header
      width 936px
      margin 0 auto
      .search_logo
        width 145px
        height 56px
        margin 0 13px 0 0
        color transparent
        background-position 0 12px
        background-repeat no-repeat
        &.book-logo
          background-image url(../../lib/images/book.png)
        &.movie-logo
          background-image url(../../lib/images/movie.png)
        &.music-logo
          background-image url(../../lib/images/music.png)
        &.city-logo
          background-image url(../../lib/images/city.png)
      .search_target
        padding-top 8px
        .search_form
          .search_input
            width 350px
            height 30px
            border none
            padding-left 10px
            background #ffffff
            outline none
            box-shadow 1px 1px 1px rgba(0,0,0,0.16)
          .search_submit
            width 37px
            height 32px
            margin 1px 0 0 -4px
            vertical-align middle
            border none
            color transparent
            cursor pointer
            outline none
            box-shadow 1px 1px 1px rgba(0,0,0,0.16)
            background-position 0 -40px
            background-repeat no-repeat
            &.book-search-icon
              background-image: url(../../lib/images/book_search_btn.png)
            &.movie-search-icon
              background-image: url(../../lib/images/movie_search_btn.png)
            &.music-search-icon
              background-image: url(../../lib/images/music_search_btn.png)
            &.city-search-icon
              background-image: url(../../lib/images/city_search_btn.png)
        .search_suggest
          position absolute
          width 360px
          z-index 50
          margin-top 6px
          background #ffffff
          border 1px solid #ddd
          .search_item
            border-bottom 1px solid #eee
            overflow hidden
            &:hover
              background #f9f9f9
            .search_item_link
              display block
              padding 6px
              overflow hidden
              zoom 1
              color #999
              .search_item_img
                width 40px
                height 56px
                float left
                margin 3px 8px 0 0
              .search_item_title
                display inline-block
                font-size 13px
                font-weight normal
                color #369
              .search_item_author,
              .search_item_genres
                margin-top 10px
      .module_list
        padding 14px 0 0 40px
        li
          display inline-block
          margin-left 25px
          padding 2px 5px
          cursor pointer
          &:hover
            background #37a
            color #fff
            .more_module_wrapper
              display block
          .more_module_wrapper
            display none
            position absolute
            margin-left -40px
            .more_module
              width 100px
              margin-top 10px
              background #fff
              border 1px solid #e7eaf1
              box-shadow 0 5px 20px rgba(0,34,77,.1)
              &::before
                content ''
                position absolute
                width 0
                height 0
                margin-top -10px
                margin-left calc(50% - 10px)
                border-left 10px solid transparent
                border-right 10px solid transparent
                border-bottom 10px solid #fff
              .more_module_link
                display block
                padding 10px
                text-align center
                color #000
                &:hover
                  background #f4f8fb
</style>
