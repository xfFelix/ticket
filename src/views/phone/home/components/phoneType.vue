
<template>
<div class="phoneType">
      <div class="phoneBill-sel-wrap">
        <div class="phoneBill-sel">
            <ul >
                <li class="phoneDirect" v-for="(item,index) in type" :key="index" :style="item.show?'':'display: none'">
                    <span class="phoneBill-selTy" :class="index==typeIndex?'select-active':''"  @click="typeSelect(index)">{{item.name}}</span>
                </li>
            </ul>
             <div class="phoneBill-card" v-show="typeIndex!=0">
                  <p> 椰子分余额：<span class="phoneBill-over">{{userinfo.score}}</span> </p>
                  <span class="phoneBill-rTit" @click="$router.push({name:'phoneRecord',query:{cardId:typeIndex}})">兑换记录 ></span>
              </div>
        </div>

        <div class="phoneBill-infoW" v-show="typeIndex==0">
            <div class="phoneBill-info">
                <div class="phoneBill-inpW phoneBill-direct">
                    <span class="logoGreen iconImg"></span>
                    <div class="input-flex">
                      <input type="tel" pattern="\d*" class="phoneBill-inp" maxlength="11" placeholder="请输入充值手机号码" v-model.trim="mobile"/>
                    </div>
                </div>
                <div class="phoneBill-OR">
                    <p> 椰子分余额：<span class="phoneBill-over">{{userinfo.score}}</span> </p>
                    <span class="phoneBill-rTit" @click="$router.push({name:'phoneRecord',query:{cardId:typeIndex}})">兑换记录 ></span>
                </div>
            </div>
        </div>
      </div>
      <div style="height:50px;" v-show="typeIndex==0"></div>
       <div class="phoneBill-money">
          <!-- 直充 -->
          <div class="phoneBill-direct" v-show="typeIndex==0">
            <ul class="phoneBill-typeU" :class="phoneCan?'phoneCan':''">
               <li v-for="(item,key,index) in dirList" :key="index" @click="dirClick(index,item,key)" :class="dirIndex==index?'price_actived':''">
                  <p class="pB-tMWrap">
                    <span class="phoneBill-tMoney"> {{key}}</span>
                    <span class="phoneBill-tYuan">元</span>
                  </p>
                  <p class="pB-tIWrap" v-if="phoneCan">
                    <span class="phoneBill-tIntegral">需积分</span>
                    <span class="phoneBill-tIntegral">{{item[1]}}</span>
                  </p>
              </li>
            </ul>
          </div>
          <!-- 卡充 -->
          <div class="phoneBill-direct" v-show="typeIndex!=0">
              <ul class="phoneBill-typeU phoneCan">
                <li v-for="(item,key,index) in cardList" :key="index"  @click="carClick(index,item,key)"
                :class="noGoods.indexOf(key)!=-1?'price_gray':(carIndex==index?'price_actived':'')"
                :style="(noGoods.indexOf(key)!=-1 && yinqiudiShow)?'display: none':''">
                    <span v-if="noGoods.indexOf(key)!=-1" class="lack" >缺货</span>
                    <p class="phoneCard-tMTop"><span class="phoneCard-tMoney">{{key}}</span><span class="phoneCard-tYuan">元</span></p>
                    <p class="phoneCard-tIWrap">
                      <span class="phoneCard-tIntegral">需积分</span>
                      <span class="phoneCard-tIntegral">{{item[1]}}</span>
                    </p>
                </li>
              </ul>
          </div>
          <p class="phone-explain" v-show="typeIndex==0">自7月1日开始，联通充值官方调整，导致本平台无法进行联通手机充值，建议转为兑换黄金，手续费低，到账及时。</p>
          <p class="phone-explain" v-show="typeIndex!=0">温馨提示：</p>
          <p class="phone-explain" v-show="typeIndex!=0">1.同一个账号在多个渠道进行充值卡充值，每天累计最多5次；</p>
          <p class="phone-explain" v-show="typeIndex!=0">2.本方式适用于向第三方转卖话费，24小时内到账，手续费率随市场波动；</p>
          <p class="phone-explain" v-show="typeIndex!=0">3.手机话费充值请使用“直充”；</p>
          <p class="phone-explain" v-show="typeIndex!=0">4.推荐本商城“黄金兑换”，费率低、到账更快。</p>
          <!-- <p class="phone-explain-important" v-show="typeIndex!=0">本方式适用于向第三方转卖话费，如需充值话费请使用“直充”功能</p> -->
          <div class="contact" @click="contact">
            <img src="../../../../common/images/gold/service-icon.png">
            <p>联系我们</p>
          </div>
      </div>
</div>
</template>
<script >
import {directPrice,cardPrice} from 'api';
import {mapGetters, mapActions} from 'vuex';
import { IsMobile } from "util/common";
import { vipCustom } from '@/mixins'
export default {
  mixins: [vipCustom],
  data:()=>({
    mobile:'',
    dirList:{},
    cardList:{},
    type:[
      {id:0,name:'直充',show:true},
      {id:1,name:'充值卡',show:true},
    ],
    typeIndex:0,
    phoneCan:false,
    dirIndex:'',
    carIndex:2,
    noGoods:['1','5'],
    yinqiudiShow:false,
    needIntegral: []
  }),
  watch:{
    mobile(val){
      if(IsMobile(val)){
          this.getDirPrice();
          this.phoneCan=true;
          this.setConfig({mobile:val})
      }else{
        this.phoneCan=false
      }
      this.$emit("hand-phoneCan",this.phoneCan)
    },
    type:{
      get() {
        return this.$store.state.phone.config.type
      },
      set(val) {
        return this.$store.dispatch('phone/setConfig',{type: val})
      }
    },
  },
  methods:{
    ...mapActions({
      setConfig: 'phone/setConfig'
    }),
      async getDirPrice(){
        let res = await directPrice({token:this.getToken,mobile:this.mobile});
        if(res.error_code!=0) return res.message;
        this.dirList = res.data;
        if(this.mobile){
          // 填了手机号码，返回的数据格式跟没有填号码时返回的数据格式不一致
          this.setConfig({dirPrice:Object.keys(this.dirList)[0],realDirP:Object.values(this.dirList)[0][0]})
        }else{
          this.setConfig({dirPrice:Object.keys(this.dirList)[0],realDirP:Object.values(this.dirList)[0]})
        }

      },
       async getCarPrice(){
        let res = await cardPrice({token:this.getToken});
        if(res.error_code!=0) return res.message;
        this.cardList = res.data;
        this.vipCustom()
      },
      typeSelect(index){
          this.setConfig({type:index})
          this.typeIndex = index;
      },
      dirClick(index,price,key){
        if(this.phoneCan==true){
          this.dirIndex = index;
          this.setConfig({dirPrice:key,realDirP:price[0]})
        }
      },
      carClick(index,price,key){
        if(this.noGoods.indexOf(key)!=-1){
          return false;
        }
        this.carIndex = index;
        this.setConfig({cardPrice:key,realCarP:price[0]})
      },
      vipCustom(){  //赢球帝
        if(this.userinfo.vendorId == 'yingqiudi'){
           this.type[0].show=false;
           this.typeIndex=1;
           this.yinqiudiShow = true;
          //['1','5','20','30','50','100','200','300','500'];//所有的金额类型
           this.noGoods=['1','5','20','30','50'];  //不需要的金额
           this.carIndex = this.noGoods.length;
           this.setConfig({
              type:1,
              cardPrice:Object.keys(this.cardList)[this.carIndex],
              realCarP:Object.values(this.cardList)[this.carIndex][0]
            })
        }else{
          this.setConfig({cardPrice:Object.keys(this.cardList)[2],realCarP:Object.values(this.cardList)[2][0]}) //初始值拿下标为1的值
        }
      },
      // 戴斯商户
      // specialCustom() {
      //   if(this.userinfo.vendorId == '5866a9fe52c04bfda0fd00aecda464b1' || this.userinfo.vendorId == 'd0ff41a07f04494ca7753686fb42383a' || this.userinfo.vendorId == '583d192da2734e5b8bd4a3837135c27a'){
      //     this.typeIndex=1;
      //     this.$store.dispatch('phone/setConfig',{type: 1})
      //   }
      // }
      contact () {
        window.location.href = `http://mad.miduoke.net/Web/im.aspx?_=t&accountid=119481`
      }
  },
  computed: {
    ...mapGetters({
      getToken: 'getToken',
      userinfo: 'getUserinfo'
    }),
  },
  mounted(){
    this.getDirPrice();
    this.getCarPrice();
    // this.specialCustom();
  },

}
</script>

<style lang="scss" scoped>
.phoneType{
  padding-top: 44px;
}
.phoneBill-sel-wrap{
  background: #313340;
  height: 141px;
  .phoneBill-sel {
    padding-top: 30px;
    color: #30ce84;
    ul {
      display: flex;
      justify-content: space-between;
      font-size: 15px;
      width: 88%;
      max-width: 450px;
      margin: 0 auto;
      border-radius: 40px;
      border: 1px solid #30ce84;
      li {
        text-align: center;
        width: 50%;
        .phoneBill-selTy {
          width: 100%;
          display: inline-block;
          padding: 10px 0;
        }
        .select-active {
          background: #30ce84;
          color: #fff;
          border-radius: 40px;
          }
      }
    }
  }
}

.phoneBill-infoW {
  padding-top: 30px;
  color: #fff;
  width: 88%;
  margin: 0 auto;
    .phoneBill-info {
    margin: 0 auto;
    .phoneBill-inpW {
      height: 60px;
      background: #fff;
      box-shadow:0px 1px 10px 0px rgba(55,60,72,0.25);
      border-radius: 5px;
      display: flex;
      align-items: center;
      padding: 0 15px;
      box-sizing: border-box;
    }
    .phoneBill-inpImg {
      margin-right:10px;
    }
  }
}
.phoneBill-money {
  margin: 0 2.8%;
    .phone-explain{
      color: #999;
      font-size: 12px;
      // padding-bottom: 70px;
      padding-bottom: 5px;
    }
    .phone-explain-important {
      color: #FF0000;
      font-size: 20px;
    }
  }

.phoneBill-typeU{
  overflow: auto;
  padding-bottom: 10px;
  li {
    height: 60px;
    display: inline-block;
    margin: 20px 1.6% 5px 1.6%;
    font-size: 12px;
    position: relative;
    width: 28.6%;
    border-radius: 5px;
    text-align: center;
    display: inline-flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    color: #98E7C2;
    border: 1px solid #98E7C2;
    .lack{
      position: absolute;
      line-height: 13px;
      border-radius: 0px 10px 10px 0;
      font-size: 9px;
      color: #fff;
      top: 1px;
      left: -3px;
      padding:2px 5px;
      transform: scale(0.8);
      background: #4ba1ec;
    }
  }
}


.phoneCan{
  li{
    color: #30ce84;
    border: 1px solid #30ce84;
  }
  .price_actived{
    background: #30ce84;
    color: #fff;
  }
  .price_gray{

    color: #cccccc;
    border: 1px solid #cccccc;
  }
}

.phoneBill-tMoney,
.phoneCard-tMoney {
  font-size: 24px;
}
.phoneBill-card ,.phoneBill-OR {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  align-items: center;
  color: #4a4a4a;
  .phoneBill-over{
    color: #30ce84;
  }
}
.phoneBill-card{
    color: rgb(255, 255, 255);
    width: 88%;
    text-align: center;
    margin: 38px auto 0px auto;
}
.contact {
  padding: 14px 142px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  p {
    font-size:14px;
    color: #576B95;
    text-align: center;
  }
  img {
    width: 14px;
    height: 14px;
    margin-right: 5px;
  }
}


</style>
<style>
@media screen and (min-width: 600px) {
  .phoneBnt{
    max-width: 384px; /*no*/
  }
}

</style>
