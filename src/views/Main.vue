<template>
  <div id="Merchant">
    <!-- 商家头 -->
    <div class="Merchant_info" :style="{backgroundImage:'url('+ data.avatar + ')' }">
      <div class="Merchant_info_left">
        <img :src="data.avatar" alt />
      </div>
      <div class="Merchant_info_right">
        <div class="title">
          <img :src="img" alt />
          {{data.name}}
        </div>
        <p class="p1">
          {{data.description}}
          <em>/</em>
          {{data.deliveryTime}}分钟送达
        </p>
        <p class="p2">
          <img :src="img1" alt class="img1" />
          {{data.supports? data.supports[0].description : ''}}
          <span
            class="span"
          >{{data.ratingCount}}个 ></span>
        </p>
      </div>
    </div>
    <div class="info">
      <div class="infobg">
        <img :src="img2" alt />
        <span>{{data.bulletin}}</span>
      </div>
    </div>
    <!-- 路由导航 -->
    <div id="router_link_div">
      <router-link to="goods" exact>商品</router-link>
      <router-link to="evaluate" exact>评价</router-link>
      <router-link to="merchant" exact>商家</router-link>
    </div>

    <router-view />

    <!-- 购物车 -->

    <transition name="slide-fade">
      <div v-show="shopcarShow" class="shopcar-board">
        <shopcar />
      </div>
    </transition>
    <div class="shopcar" @click="shopcarShow = !shopcarShow">
      <div class="left">
        <div class="circle">
          <img :src="img3" alt />
        </div>
      </div>
      <div class="middle">
        <p>
          <span>￥{{allprice()}}</span>|
          <span style="font-size:12px;">另需配送费{{data.deliveryPrice}}元</span>
        </p>
      </div>
      <div class="right">￥{{data.minPrice}}起送</div>
    </div>
  </div>
</template>
    
<script>
import shopcar from "./Shopcar.vue";
import { getseller,getgoods  } from "../api/apis";
import img from "../assets/img/brand@2x.png";
import img1 from "../assets/img/decrease_1@2x.png";
import img2 from "../assets/img/bulletin@2x.png";
import img3 from "../assets/img/shopcar.png";
export default {
  components: {
    shopcar
  },
  data() {
    return {
      data: {},
      img: img,
      img1: img1,
      img2: img2,
      img3: img3,
      // allprice: 0,
      shopcarShow: false
    };
  },
  created() {
    getseller().then(d => {
      console.log(d.data.data);
      this.data = d.data.data;

    });
    getgoods().then(d => {
      console.log(d.data.data);
      this.$store.commit('initGoodsList', d.data.data)

    });
  },
  methods: {
     allprice() {
      var total = 0;
      this.getgoods.forEach(f => {
        f.foods.forEach(y => {
          if (y.num > 0) {
            total += y.num*y.price;
          }
        });
      });
        return total;
    }
  },
  computed: {
    getgoods(){
       return this.$store.state.goodslist;
    }
  },
};
</script>
    
<style scoped lang='less'>
#Merchant {
  padding: 0;
  margin: 0;
  display: flex;
  flex-flow: column;
  align-items: stretch;
  height: 100%;
  //   background: rgb(244, 245, 247);
  .Merchant_info {
    height: 120px;
    width: 100%;
    background-size: cover;
    // filter: blur(10px);
    // background: rgb(65, 60, 57);
    display: flex;
    .Merchant_info_left {
      width: 30%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 70px;
      }
    }
    .Merchant_info_right {
      width: 70%;
      padding: 25px 0;
      .title {
        font-size: 16px;
        font-weight: bold;
        color: #fff;

        img {
          width: 40px;
          vertical-align: middle;
        }
      }
      .img1 {
        width: 16px;
        vertical-align: middle;
      }
      .p1 {
        color: rgb(249, 249, 249);
        font-size: 16px;
      }
      .p2 {
        color: rgb(249, 249, 249);
        font-size: 12px;
        .span {
          display: block;
          width: 50px;
          height: 24px;
          background: rgba(247, 247, 247, 0.1);
          border-radius: 10px;
          text-align: center;
          line-height: 24px;
          float: right;
          margin-right: 20px;
        }
      }
    }
  }
  .info {
    background: rgb(65, 60, 57);
    height: 30px;

    .infobg {
      background: rgba(247, 247, 247, 0.1);
      line-height: 30px;
      color: aliceblue;

      img {
        vertical-align: middle;
        margin-left: 15px;
        width: 30px;
      }
      span {
        padding-left: 10px;
        font-size: 12px;
      }
      display: block; /*内联对象需加*/
      word-break: keep-all; /* 不换行 */
      white-space: nowrap; /* 不换行 */
      overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
      text-overflow: ellipsis; /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
    }
  }
  #router_link_div {
    display: flex;
    justify-content: space-around;
    line-height: 50px;
    font-size: 16px;
    background: #fff;
    border-bottom: 1px solid #999;
    a {
      text-decoration: none;
      color: #333;
    }
    .router-link-active {
      text-decoration: none;
      color: red;
    }
  }
  .shopcar {
    position: fixed;
    bottom: 0;
    height: 40px;
    width: 100%;
    // background: rgba(10, 10, 10, 0.5);
    background: rgb(19, 29, 38);
    display: flex;
    justify-content: space-between;

    .left {
      width: 20%;
      .circle {
        position: absolute;
        left: 15px;
        bottom: 0;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: rgb(19, 29, 38);
        img {
          width: 40px;
          margin: 5px;
        }
      }
    }
    .middle {
      width: 55%;
      line-height: 40px;
      span {
        padding: 0 15px;
      }
    }
    .right {
      width: 25%;
      line-height: 40px;
      background: rgb(43, 52, 59);
      text-align: center;
    }
  }
}

.shopcar-board {
  position: fixed;
  height: 200px;
  width: 100%;
  bottom: 40px;
  background-color: #fff;
  // overflow: scroll;
}
.slide-fade-enter-active {
  transition: all 0.4s ease;
}
.slide-fade-leave-active {
  transition: all 0.4s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(200px);
  opacity: 0;
}
</style>