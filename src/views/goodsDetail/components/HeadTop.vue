<template>
    <div class="headTop" >
        <div class="ab-head" v-if="!headShowC"  ref="sc">
            <div class="iconfont background-op h-searchBack" @click="$router.back()">&#xe61e;</div>
            <div class="iconfont background-op h-searchBack"  @click="showDialog()">&#xe80c;</div> 
        </div>
        <div class="ab-headFixed" v-if="headShowC"  ref="sc">
            <div class="iconfont  h-searchBack" @click="$router.back()">&#xe61e;</div>
            <div class="iconfont  h-searchBack" @click="showDialog()">&#xe80c;</div> 
        </div>
        <div class="fixOut" style="bottom:0px;">
            <div class="relOut">
                <span class="iconfont background-op goTop" @click="goTop()" v-if="headShowC">&#xe811;</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        headShowC:Boolean
    },
    data: () => ({
        showDialogC: false,
    }),
    methods: {
        goTop() {
            //参数i控制速度
            document.body.scrollTop -= 500;
            document.documentElement.scrollTop -= 500;
            if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
                var c = setTimeout(() => this.goTop(), 16);
            } else {
                clearTimeout(c);
            }
        },
        showDialog(){
            this.showDialogC = true;
            this.$emit('showDialogC',this.showDialogC)
        }
    },
    mounted(){

       this.$emit('headHightC',this.$refs.sc.offsetHeight)
    }
}
</script>
<style lang="scss" scoped>
.background-op {
    background: rgba(0, 0, 0, 0.4);
}
.ab-head,
.ab-headFixed {
    display: flex;
    position: fixed;
    top: 0;
    justify-content: space-between;
    width: 100%;
    padding: 22px 8px 4px 11px;
    box-sizing: border-box;
    z-index: 5;
    .h-searchBack {
        width: 36px;
        height: 36px;
    }
    .h-searchBack {
        text-align: center;
        line-height: 36px;
        border-radius: 50%;
        color: #fff;
    }
}

.ab-headFixed {
    background: #fff;
    .h-searchBack {
        color: #000 !important;
    }
}

.goTop {
    width: 35px;
    height: 36px;
    color: #fff;
    display: inline-block;
    font-size: 25px;
    line-height: 36px;
    text-align: center;
    bottom: 30px;
    right: 8px;
    position: absolute;
    background: rgba(0, 0, 0, 0.8);
    z-index: 100;
}

</style>
<style>
@media screen and (min-width: 600px) {
  .ab-headFixed,.ab-head{
    max-width: 384px; /*no*/
  }
}
</style>
