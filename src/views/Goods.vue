<template>
  <div class="goods">
    <div class="goodsleft">
      <ul class="content">
        <ul>
        <li v-for="(v,i) in data" :key="i" @click="clickbtn(i)" :class="select==i ? 'active' : ''">
          
          <a><img style="width:14px" v-show="v.type==1 " :src="icon1" alt="">
          <img style="width:14px" v-show="v.type==2 " :src="icon2" alt="">{{v.name}}</a>
        </li>
      </ul>
      </ul>
    </div>
    <div class="goodsright">
      <ul class="content">
        <div class="foodsinfo" v-for="(v,i) in data" :key="i" :id="i">
        <p class="title">{{v.name}}</p>
        <Row class="foodslist" v-for="(b,k) in v.foods" :key="k">
          <i-col span="9">
            <img :src="b.icon" alt />
          </i-col>
          <i-col span="15">
            <h3>{{b.name}}</h3>
            <p class="font12">{{b.description}}</p>
            <p class="font12">月售{{b.sellCount}}份&emsp;好评率{{b.rating}}%</p>
            <span class="red">￥<span class="font18">{{b.price}}</span>&emsp;<del>￥{{b.oldPrice}}</del></span>
          </i-col>
        </Row>
      </div>
      </ul>
    </div>
  </div>
</template>

<script>
import { getgoods } from "../api/apis";
import icon1 from '../assets/img/discount_1@2x.png'
import icon2 from '../assets/img/decrease_1@2x.png'
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      data: {},
      icon1:icon1,
      icon2:icon2,
      select:0,
    };
  },
  created() {
    getgoods().then(d => {
      console.log(d);
      this.data = d.data.data;
    });
  },
  mounted() {
    new BScroll(document.querySelector('.goodsleft'),{
      click:true,
    })
    this.rigntchange=new BScroll(document.querySelector('.goodsright'));
  },
  methods: {
    clickbtn(i){
      console.log(i);
      this.select=i;
    this.rigntchange.scrollToElement(document.getElementById(i),600)
    // this.leftchange.scrollToElement(document.getElementById(i),600)
    }
  },
};
</script>

<style scoped lang='less'>
  .active {
    background: #fff;
  }
.goods {
  flex: 1 1 auto;
  display: flex;
    height: 100%;
    overflow: auto;
  .goodsleft {
    width: 80px;
    overflow: scroll;
    background: rgb(244, 245, 247);
    li {
      // height: 50px;
      // font-size: 12px;
      // background: #fff;
      overflow: hidden;
      padding: 10px;
      box-sizing: border-box;
      min-height: 60px;
      color: #666666;
      font-size: 14px;
      text-align: left;
      padding-top: 15px;
      padding-bottom: 30px;
      font-size: 0;
      a {
        position: relative;
        display: inline-block;
        line-height: 18px;
        font-size: 12px;
        color: #666666;
        img{
          vertical-align: middle;
        }
      }
    }
  }
  .goodsright {
    flex: 1 ;
    height: 100%;
    background: #fff;
    overflow: scroll;
    .foodsinfo {
        .title {
          line-height: 30px;
          background: rgb(244, 245, 247);
          color: rgb(170, 173, 178);
          padding-left: 20px;
          border-left: 2px solid rgb(217, 220, 225);
        }
      .foodslist {
        // height: 100px;
        padding: 15px;
        border-bottom: 1px solid #ccc;
        
      
      .font12 {
        font-size: 12px;
        color: rgb(158, 162, 165);
        line-height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 150px;

      }
      .red{
          color: red;
      }
      .font18{
          font-size: 18px;
      }
      del{
          font-size: 12px;
          color: #888;
      }
      img {
        width: 100%;
        height: 100%;
        padding-right: 10px;
        vertical-align: middle;
      }
      }
    }
  }
}
</style>