<template>
  <div>
    <div class="identity-photo-wrap">
      <p class="identity-title">请上传您的身份证照片</p>
      <div class="identity-front-back">
        <!-- 身份证正面照 -->
        <div class="identity-img front" :class="frontImg && 'mask'">
          <img :src="frontImg" alt="" srcset="">
          <input type="file" class="input-file" @change="frontHandler" accept="image/*" ref="front">
        </div>
        <!-- 身份证反面照 -->
        <div class="identity-img back" :class="backImg && 'mask'">
          <img :src="backImg" alt="" srcset="">
          <input type="file" class="input-file" @change="backHandler" accept="image/*" ref="back">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    frontFiles: [],
    backFiles: [],
    frontImg: '',
    backImg: ''
  }),
  methods: {
    frontHandler() {
      this.frontFiles = this.$refs.front.files[0]
      this.uploadImg(this.frontFiles,'front')
    },
    backHandler() {
      this.backFiles = this.$refs.back.files[0]
      this.uploadImg(this.backFiles,'back');
    },
    // 上传图片
    uploadImg(file,imgDir) {
      let that = this;
      let hasIgnore = false;
      const limitSize = 20 *1024 ;
      // 如果选择的图片大小大于20K则进行图片压缩处理（Base64）
      if (file.size > limitSize) {
        this.compressPic(file,imgDir);
      } else {
        let reads = new FileReader();
        reads.readAsDataURL(file);
        reads.onload = function(e) {
          let bdata = e.target.result;
          // let dataBese = bdata.split(',')[1];
          if(imgDir=='front'){
            that.frontImg = bdata
            that.$emit("front-file", bdata);
          }else{
            that.backImg = bdata
            that.$emit("back-file", bdata);
          }
        };
      }
    },
    compressPic(file,imgDir) {
      let reads = new FileReader();
      reads.readAsDataURL(file);
      let that = this;
      reads.onload = function(e) {
        var bdata = e.target.result;
        // 这里quality的范围是（0-1）
        var quality = 0.92;
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        var img = new Image();
        img.src = bdata;
        img.onload = function() {
          var width = 400;
          // var width = img.width;
          canvas.width = width;
          canvas.height = width * (img.height / img.width);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          let data = canvas.toDataURL("image/jpeg", quality);
          // let dataBese = data.split(',')[1];
          //  console.log(data)
          if(imgDir=='front'){
            that.frontImg = bdata
            that.$emit("front-file", data);
          }else{
            that.backImg = bdata
            that.$emit("back-file", data);
          }
        };
      };
    },

  }
};
</script>

<style lang="scss" scoped>
.identity-photo-wrap {
  background: #fff;
  padding: 25px 15px 30px 15px;
  .identity-title {
    color: #4e4e4e;
    font-size: 14px;
  }
  .identity-front-back {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    .identity-img {
      width: 160px;
      height: 140px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      &.front{
        background: url("~@/common/images/frontImg.png") no-repeat;
        background-size: 100% 100%;
      }
      &.back{
        background: url("~@/common/images/backImg.png") no-repeat;
        background-size: 100% 100%;
      }
      &.mask{
        background: rgba(0, 0, 0, 0.25);
        border-radius: 8px;
      }
      .input-file{
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 3;
        opacity: 0;
      }
      img {
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
      }
    }
  }
}
</style>
