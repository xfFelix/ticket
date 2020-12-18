
import {mapGetters} from 'vuex'
export default {
  data:()=>({
    yingqiudiShow:false,
    haofang:false
  }),
  computed: {
    ...mapGetters({
      userinfo: 'getUserinfo',
      platform: 'platform/getPlatform',
      vendorId: 'platform/getVendorId',
    })
  },
  // created() {
  //   if (this.platform && this.vendorId=='3839c796c9574b05a80c87f0adfb1f21') {
  //     this.haofang = true
  //   }
  // },
  mounted(){
    if(this.userinfo.vendorId == 'yingqiudi'){
      this.yingqiudiShow = true;
    }
    if (this.platform && this.vendorId=='3839c796c9574b05a80c87f0adfb1f21') {
      this.haofang = true
    }
  }
}
