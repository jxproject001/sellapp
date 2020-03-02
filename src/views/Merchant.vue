<template>
  <div class="chant">
    <div class="chanttop">
      <div class="toptop">
        <div class="ttleft">
          <p>{{data.name}}</p>
          <Rate class="small1" disabled show-text allow-half v-model="data.score">
            <span>({{data.ratingCount}})</span>
            <span>月售{{data.sellCount}}单</span>
          </Rate>
        </div>
        <div class="ttright">
          <Icon type="md-heart" size="24" color="red" />
          <p style="font-size:12px;">已收藏</p>
        </div>
      </div>
      <div class="topbotm">
        <div>
          <p>起送价</p>
          {{data.minPrice}}
          <span>元</span>
        </div>
        <div class="border">
          <p>商家配送</p>
          {{data.deliveryPrice}}
          <span>元</span>
        </div>
        <div>
          <p>平均配送时间</p>
          {{data.deliveryTime}}
          <span>分钟</span>
        </div>
      </div>
    </div>
    <div class="cont">
      <p style="line-height:40px;padding-left:20px;">公告与活动</p>
      <p
        style="color:red;padding:0 30px 20px 30px;0;font-size:12px;line-height:20px;"
      >{{data.bulletin}}</p>

      <div class="list">
        <div v-for="(v,i) in data.supports" :key="i">
          <img style="width:14px" v-show="v.type==0 " :src="img" alt />
          <img style="width:14px" v-show="v.type==1 " :src="img1" alt />
          <img style="width:14px" v-show="v.type==2 " :src="img2" alt />
          <img style="width:14px" v-show="v.type==3 " :src="img3" alt />
          <img style="width:14px" v-show="v.type==4 " :src="img4" alt />
          {{ v.description }}
        </div>
      </div>
    </div>

    <div class="chantimg">
      <h4 style="line-height:40px;">商家实景</h4>
      <!-- <div class="img" v-for="(b,k) in data.pics" :key="k">
         <img width="100%" height="180" :src="b" alt="">
      </div> -->
      <Carousel autoplay v-model="value1" loop>
        <CarouselItem v-for="(b,k) in data.pics" :key='k'>
          <div class="demo-carousel">
              <img width="100%" height="180" :src="b" alt="">
          </div>
        </CarouselItem>
       
      </Carousel>
    </div>

    <div class="chantinfo">
        <h4 style="line-height:40px;">商家信息</h4>
        <div class="info" v-for="(item,index) in data.infos" :key="index">
            {{ item}}
        </div>
    </div>
  </div>
</template>

<script>
import { getseller } from "../api/apis";
import img from "../assets/img/decrease_3@2x.png";
import img1 from "../assets/img/discount_3@2x.png";
import img2 from "../assets/img/guarantee_3@2x.png";
import img3 from "../assets/img/invoice_3@2x.png";
import img4 from "../assets/img/special_3@2x.png";
export default {
  data() {
    return {
      data: {},
      img: img,
      img1: img1,
      img2: img2,
      img3: img3,
      img4: img4,
      value1: 0
    };
  },
  created() {
    getseller().then(d => {
      console.log(d.data.data);
      this.data = d.data.data;
    });
  }
};
</script>

<style scoped lang='less'>
.chant {
  background: rgb(244, 245, 247);
  height: 100%;
  overflow: scroll;
  .chanttop {
    background: #fff;
    padding: 20px 0 0 0;
    .toptop {
      margin: 0 20px;
      padding-bottom: 20px;
      display: flex;
      border-bottom: 1px solid #999;
      justify-content: space-between;
      .ttleft {
        width: 85%;
        .small1 {
          font-size: 14px;

          span {
            font-size: 12px;
          }
        }
      }
      .ttright {
        width: 15%;
        text-align: center;
      }
    }
    .topbotm {
      padding: 20px;
      display: flex;
      .border {
        border-left: 1px solid #999;
        border-right: 1px solid #999;
      }
      justify-content: space-around;
      div {
        width: 33%;
        text-align: center;
        font-size: 18px;
        p {
          font-size: 10px;
          color: #888;
        }
        span {
          font-size: 10px;
          color: #888;
        }
      }
    }
  }
  .cont {
    margin-top: 20px;
    background: #fff;
    .list {
      margin: 0 20px;
      line-height: 50px;
      div {
        border-top: 1px solid #999;
      }
    }
  }
  .chantimg {
    margin: 20px 0 ;
    background: #fff;
    padding: 0px 20px 20px 20px;
    // .img{
    //     overflow: hidden;
    //     white-space: nowrap;
    //     height: 180px;
    //     img{
    //         float: left;
    //     }
    // }
  }
  .chantinfo{
    // margin: 20px 0;
    padding: 0px 20px 20px 20px;
      background: #fff;
      .info{
      display: flex;
      align-items: center;
          height: 50px;
          width: 100%;
          font-size: 12px;
          padding:0 10px;
            border-top: 1px solid #999;
      }
  }
}
</style>