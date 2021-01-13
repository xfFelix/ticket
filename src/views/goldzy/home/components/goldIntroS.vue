<template>
  <div class="gold-intro">
    <div class="products-change-wrapper item">
      <p class="title"><span class="square"></span>回购须知</p>
      <div class="products-change">
        <div class="products-change-detail-wrapper">
          <div class="products-change-detail">
            <div class="top-title">
              <p><span class="icon"></span>回购折损率</p>
              <div class="order-number">01</div>
            </div>
            <p class="detail">黄金回购手续费为1%，即回购黄金到账金额=本笔兑换黄金积分×1元/椰子分×（1-1%）。</p>
          </div>
        </div>
        <div class="products-change-detail-wrapper">
          <div class="products-change-detail">
            <div class="top-title">
              <p><span class="icon"></span>回购折损说明</p>
              <div class="order-number">02</div>
            </div>
            <p class="detail">回购由东莞市皇帝珠宝有限公司提供统一服务，折损包括资金占用成本、回购业务让利的综合费用。</p>
          </div>
        </div>
        <div class="products-change-detail-wrapper">
          <div class="products-change-detail">
            <div class="top-title">
              <p><span class="icon"></span>回款时间</p>
              <div class="order-number">03</div>
            </div>
            <p class="detail">>24小时内回款，为保证资金安全及时处理，每天10:30、16:30各处理一次。</p>
          </div>
        </div>
        <div class="products-change-detail-wrapper">
          <div class="products-change-detail">
            <div class="top-title">
              <p><span class="icon"></span>回款流程</p>
              <div class="order-number">04</div>
            </div>
            <p class="detail">兑换后点击“立即回购”，填写银行账户提交即可办理。</p>
          </div>
        </div>
        <div class="products-change-detail-wrapper">
          <div class="products-change-detail">
            <div class="top-title">
              <p><span class="icon"></span>兑换当时未回购的处理方式</p>
            <div class="order-number">05</div>
            </div>
            <p class="detail">您的本次兑换以订单方式存在“我的-黄金兑换”中，可打开选择订单继续操作流程。</p>
          </div>
        </div>
        <div class="products-change-detail-wrapper">
          <div class="products-change-detail">
            <div class="top-title">
              <p><span class="icon"></span>超过24小时未收到回款原因</p>
              <div class="order-number">06</div>
            </div>
            <p class="detail">约定时间内未收到回款，有可能是您的银行账户填写有误，请点击下方“联系我们”向我们反馈，我们将及时解决您的问题。</p>
          </div>
        </div>
        <div class="products-change-detail-wrapper">
          <div class="products-change-detail">
            <div class="top-title">
              <p><span class="icon"></span>兑换及回购后可退分吗？</p>
              <div class="order-number">07</div>
            </div>
            <p class="detail">黄金属贵金属交易，根据第三方服务承诺，无法退回。</p>
          </div>
        </div>
        <div class="products-change-detail-wrapper">
          <div class="products-change-detail">
            <div class="top-title">
              <p><span class="icon"></span>兑换后黄金供货服务提供方</p>
            <div class="order-number">08</div>
            </div>
            <p class="detail">东莞市皇帝珠宝有限公司提供服务。</p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.gold-intro {
  .item {
    margin-top: 30px;
    .title {
      font-size: 15px;
      color: #444444;
      font-weight: 600;
      font-family: PingFangSC-Medium, PingFang SC;
      .square {
        display: inline-block;
        margin-right: 5px;
        width: 2px;
        height: 14px;
        background-color: #D5A96E;
      }
    }
  }
  .products-change-wrapper {
    .products-change {
      .products-change-detail-wrapper {
        // position: relative;
        margin-top: 12px;

        .products-change-detail {
          width: 342px;
          padding: 16px;
          box-sizing: border-box;
          background-color: #FFFFFF;
          border-radius: 10px;
          box-shadow: 0px -1px 10px 0px rgba(220,220,220,0.6);
          .top-title {
            display: flex;
            justify-content: space-between;
            p {
              font-size: 15px;
              color: #444444;
              font-weight: 600;
              .icon {
                display: inline-block;
                margin-right: 5px;
                width: 14px;
                height: 14px;
                background-image: url('../../../../common/images/gold-hd/question.png');
                background-size: 100% 100%;
              }
            }
            .order-number {
              margin-top: -5px;
              width: 50px;
              height: 30px;
              text-align: center;
              line-height: 30px;
              font-size: 30px;
              font-family: DIN-Bold, DIN;
              font-weight: bold;
              color: rgba($color: #000000, $alpha: 0.04);
            }
          }
          .detail {
              margin-top: 14px;
              position: relative;
              width: 310px;
              line-height: 18px;
              padding: 10px;
              box-sizing: border-box;
              font-size: 12px;
              background-color: rgba($color: #B4B4B4, $alpha: 0.1);
              color: rgba($color: #444444, $alpha: 0.6);
              border-radius: 5px;
            }
          .detail::before {
            position: absolute;
            top: -12px;
            left: 22px;
            content: '';
            width: 0;
            height: 0;
            border-left: 12px solid transparent;
            border-right: 12px solid transparent;
            border-bottom: 12px solid rgba($color: #B4B4B4, $alpha: 0.1);
            // width: 12px;
            // height: 12px;
            // background-color: rgba($color: #B4B4B4, $alpha: 0.1);
            // transform: rotate(45deg);
          }
        }
        &:last-child {
          margin-bottom: 30px;
        }
      }
    }
  }
}
</style>
<style scoped>
.sub-title {
    margin: 0 auto;
    margin-top: 30px;
    width: 131px;
    text-align: center;
    font-size: 12px;
    color: #D5A96E;
  }
</style>
