export default router => {
  router.beforeEach(async(to, from, next) =>{
    if (to.path.includes("oil")) {
      document.title = '加油卡'
    } else if(to.path.includes("memberCard")){
      document.title = '会员卡券'
    }else if(to.path.includes("changeCoin")){
      document.title = '兑换'
    }else if(to.path.includes("life")){
      document.title = '生活缴费'
    } else if(to.path.includes("gold")){
      document.title = '黄金兑换'
    } else {
      document.title = '海南旅游'
    }
    next()
  })
}
