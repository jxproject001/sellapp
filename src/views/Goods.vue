<template>
  <div class="goods">
    <div class="goodsleft">
      <ul class="content">
        <ul>
          <li
            v-for="(v,i) in goodslist"
            :key="i"
            @click="clickbtn(i)"
            :class="select==i ? 'active' : ''"
          >
            <a>
              <img style="width:14px" v-show="v.type==1 " :src="icon1" alt />
              <img style="width:14px" v-show="v.type==2 " :src="icon2" alt />
              {{v.name}}
            </a>
          </li>
        </ul>
      </ul>
    </div>
    <div class="goodsright">
      <ul class="content">
        <div class="foodsinfo" v-for="(v,i) in goodslist" :key="i" :id="i">
          <p class="title">{{v.name}}</p>
          <Row class="foodslist" v-for="(b,k) in v.foods" :key="k">
            <i-col span="9">
              <img :src="b.icon" alt />
            </i-col>
            <i-col span="15">
              <h3>{{b.name}}</h3>
              <p class="font12">{{b.description}}</p>
              <p class="font12">月售{{b.sellCount}}份&emsp;好评率{{b.rating}}%</p>
              <div class="red">
                <div class="price">
                  ￥
                  <span class="font18">{{b.price}}</span>&emsp;
                  <del>￥{{b.oldPrice}}</del>
                </div>
                <div class="btn">
                  <button @click="clicklow(b.name)" v-show="b.num>0">-</button>
                  <span v-show="b.num>0">{{b.num}}</span>
                  <button @click="clickup(b.name)">+</button>
                </div>
              </div>
            </i-col>
          </Row>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import { getgoods } from "../api/apis";
import icon1 from "../assets/img/discount_1@2x.png";
import icon2 from "../assets/img/decrease_1@2x.png";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      icon1: icon1,
      icon2: icon2,
      select: 0
    };
  },
  created() {
    getgoods().then(d => {
      console.log(d.data.data);
      this.$store.commit("initGoodsList", d.data.data);
    });
  },
  mounted() {
    var that = this;
    new BScroll(document.querySelector(".goodsleft"), {
      click: true
    });
    that.rigntchange = new BScroll(document.querySelector(".goodsright"), {
      probeType: 3
    });
    that.rigntchange.on("scroll", ({ y }) => {
      let _y = Math.abs(y);
      // console.log(_y);
      // console.log(this.getheight);
      that.getheight.forEach(function(v) {
        if (_y >= v.min && _y < v.max) {
          that.select = v.index;
          return;
        }
      });

      // if(_y>=0 && _y < 1128){
      //   this.select=0;
      // }else if(_y>=1128 && _y < 1278){
      //   this.select=1;
      // }else if(_y>=1278 && _y < 1410){
      //   this.select=2;
      // }else if(_y>=1410 && _y < 1743){
      //   this.select=3;
      // }else if(_y>=1743 && _y < 1976){
      //   this.select=4;
      // }else if(_y>=1976 && _y < 2228){
      //   this.select=5;
      // }else if(_y>=2228 && _y < 2562){
      //   this.select=6;
      // }else if(_y>=2562 && _y < 3122){
      //   this.select=7;
      // }else if(_y>=3122 && _y < 3272){
      //   this.select=8;
      // }
    });
  },
  computed: {
    getheight() {
      let arr = [];
      let height = 0;
      for (let i = 0; i < this.goodslist.length; i++) {
        let divheight = document.getElementById(i).offsetHeight;
        arr.push({ min: height, max: height + divheight, index: i });

        height += divheight;
      }
      console.log(arr);

      return arr;
    },
    goodslist() {
      return this.$store.state.goodslist;
    }
  },
  methods: {
    clickbtn(i) {
      console.log(i);
      this.select = i;
      this.rigntchange.scrollToElement(document.getElementById(i), 600);
      // this.leftchange.scrollToElement(document.getElementById(i),600)
    },
    clicklow(name) {
      this.$store.commit("lowNum", name);
       console.log(this.$store.state.goodslist);
    },
    clickup(name) {
      this.$store.commit("addNum", name);
       console.log(this.$store.state.goodslist);
    }
  }
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
        img {
          vertical-align: middle;
        }
      }
    }
  }
  .goodsright {
    flex: 1;
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
        .red {
          display: flex;
          .price {
            color: red;
          }
          justify-content: space-between;
          .btn {
            align-items: flex-end;
            line-height: 26px;
            text-align: center;
            button {
              width: 20px;
              height: 20px;
              border-radius: 50%;
              line-height: 20px;
              border: 0;
              margin: 0 5px;
              background: rgb(0, 159, 220);
              font-size: 16px;
              color: #fff;
            }
          }
        }
        .font18 {
          font-size: 18px;
        }
        del {
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