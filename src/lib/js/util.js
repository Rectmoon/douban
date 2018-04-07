export default {
  spliceArr (arr, size) {
    // 切割数组
    let len = arr.length
    let res = []
    for (let i = 0; i < Math.ceil(len / size); i++) {
      let start = i * size
      let end = start + size
      res.push(arr.slice(start, end))
    }
    return res
  },
  getStarStyle (score) {
    // 星级评分
    let posY = Math.round(10 - score) * 10
    return {
      backgroundPosition: `0 ${posY}%`
    }
  }
}
