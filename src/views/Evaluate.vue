<template>
  <div id="evaluate">
    <ul class="content">
      <Row class="evaluate">
      <i-col class="eva_left" span="8">
        <div>
          <h1
            class="yellow"
          >{{((data.score+data.serviceScore+data.rankRate)/data.ratingCount).toFixed(1)}}</h1>
          <p class="p1">综合评分</p>
          <span>高于周边商家{{data.rankRate}}%</span>
        </div>
      </i-col>
      <i-col class="eva_right" span="16">
        <p class="p2">
          服务态度：
          <Rate class="small" disabled show-text allow-half v-model="valueCustomText">
            <span style="color: #f5a623">{{ valueCustomText }}</span>
          </Rate>
        </p>
        <p class="p2">
          口味评分：
          <Rate class="small" disabled show-text allow-half v-model="valueCustomText">
            <span style="color: #f5a623">{{ valueCustomText1 }}</span>
          </Rate>
        </p>
        <p class="p2">
          送达时间：
          <span class="spana">{{data.deliveryTime}}分钟</span>
        </p>
      </i-col>
    </Row>
    <div class="content">
      <div class="tit">
        <div class="btn">
          <Button :size="buttonSize" type="primary">全部 57</Button>
          <Button :size="buttonSize" type="info">满意 47</Button>
          <Button :size="buttonSize" type="warning">不满意 10</Button>
        </div>
        <div class="titcont">
          <Icon type="md-checkmark-circle" size="28" />只看有内容的评价
        </div>
      </div>
      <div class="list" v-for="(v,i) in user " :key="i">
        <i-col span="3">
          <Avatar :src="v.avatar" />
        </i-col>
        <i-col span="21">
          <p>{{v.username}}{{v.rateTime}}</p>
          <Rate class="small1" disabled show-text allow-half v-model="v.score">
            <span class="spana">{{data.deliveryTime}}分钟送达</span>
          </Rate>
          <p>{{v.text}}</p>
        </i-col>
      </div>
    </div>
    </ul>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { getseller } from "../api/apis";
import { getratings } from "../api/apis";
export default {
  data() {
    return {
      data: {},
      user: {},
      valueCustomText: 3.8,
      valueCustomText1: 3.8,
      buttonSize: "large"
    };
  },
  mounted() {
    new BScroll(document.querySelector("#evaluate"), {
      click: true
    });
  },
  created() {
    var that = this;
    getseller().then(d => {
      console.log(d.data.data);
      that.data = d.data.data;
      that.valueCustomText = d.data.data.serviceScore;
      that.valueCustomText1 = d.data.data.score;
    });
    getratings().then(b => {
      console.log(b);
      that.user = b.data.data;

    });
  }
};
</script>

<style scoped lang='less'>
#evaluate {
  background: rgb(244, 245, 247);
  min-height: 500px;
  overflow: scroll;
  .evaluate {
    padding: 15px 15px 15px 15px;
    background: #fff;
    .yellow {
      color: rgb(251, 150, 2);
    }
    .p1 {
      color: #000;
      font-size: 18px;
      font-weight: 600;
    }
    .p2 {
      color: #000;
      font-size: 12px;
      font-weight: 600;
      line-height: 30px;
    }
    .eva_left {
      text-align: center;
      border-right: 1px solid #ccc;
      span {
        font-size: 10px;
      }
    }
    .eva_right {
      padding-left: 10px;
      .small {
        width: 65%;
        font-size: 5px;
      }
      .spana {
        color: #999;
      }
    }
  }
  .content {
    margin-top: 30px;
    min-height: 300px;
    background: #fff;
    .tit {
      padding: 20px;
      border-bottom: 1px solid #999;
      .btn {
        padding: 0 0 20px 0;
        margin: 0 0 20px 0;
        border-bottom: 1px solid #999;
        button {
          margin-right: 15px;
        }
      }
      .titcont {
        font-size: 22px;
      }
    }
    .list {
      margin: 0 20px;
      padding: 20px 0;
      border-bottom: 1px solid #ccc;
      min-height: 150px;
      .small1 {
        font-size: 10px;
      }
    }
  }
}
</style>