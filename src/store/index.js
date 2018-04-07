import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './types'
import book from './modules/book'
import axios from 'axios'
Vue.use(Vuex)

const moduleTypes = [
  {
    value: 'book',
    text: '读书',
    field: 'books',
    logo: 'book-logo',
    searchIcon: 'book-search-icon',
    placeholder: '书名、作者、ISBN',
    backgroundColor: '#f6f6f1',
    subTypes: [{
      text: '按标签分类',
      path: 'book-tag'
    }, {
      text: '按类型分类',
      path: 'book-type'
    }]
  },
  {
    value: 'movie',
    text: '电影',
    field: 'subjects',
    logo: 'movie-logo',
    searchIcon: 'movie-search-icon',
    placeholder: '电影、影人、影院、电视剧',
    backgroundColor: '#f0f3f5',
    subTypes: [{
      text: '按时间分类',
      path: 'movie-show-time'
    }, {
      text: '按标签分类',
      path: 'movie-tag'
    }]
  },
  {
    value: 'music',
    text: '音乐',
    field: 'musics',
    logo: 'music-logo',
    searchIcon: 'music-search-icon',
    placeholder: '唱片名、表演者、条码、ISRC',
    backgroundColor: '#f0f3ef',
    subTypes: [{
      text: '按标签分类',
      path: 'music-tag'
    }]
  },
  {
    value: 'city',
    text: '同城',
    logo: 'city-logo',
    searchIcon: 'city-search-icon',
    placeholder: 'sorry, 同城活动暂无搜索功能',
    backgroundColor: '#f6f5f2',
    subTypes: [{
      text: '按城市分类',
      path: 'city'
    }]
  }

]

const state = {
  moduleTypes,
  currentModuleType: moduleTypes[0],
  searchData: []
}

const mutations = {
  [types.CHANGE_CURRENT_MODULE_TYPE] (state, moduleType) {
    state.currentModuleType = moduleType
  },
  [types.SET_SEARCH_DATA] (state, data) {
    state.searchData = data
  }
}

const actions = {
  getSearchData ({commit, state}, {keyword, count = 6, start = 0}) {
    axios.get(`/api/${state.currentModuleType.value}/search`, {
      params: {
        q: keyword,
        start,
        count
      }
    })
      .then(res => {
        commit(types.SET_SEARCH_DATA, res.data[state.currentModuleType.field])
      })
  }
}

const getters = {
  b: state => moduleTypes[2]
}

export default new Vuex.Store({
  modules: {
    book
  },
  state,
  mutations,
  actions,
  getters
})
