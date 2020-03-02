<template>
  <div>
    <p>数量：{{allprice()}}</p>
    <div class="scroll">
      <ul class="content">
        <div class="shop" v-for="v in getGoodslist" :key="v.id">
          <div class="shopcarleft">{{v.name}}</div>
          <div class="shopcarmiddle">￥{{ v.price}}</div>
          <div class="shopcarright"> <div class="btn">
                  <button @click="clicklow(v.name)" v-show="v.num>0">-</button>
                  <span v-show="v.num>0">{{v.num}}</span>
                  <button @click="clickup(v.name)">+</button>
                </div></div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { getgoods } from "../api/apis";

export default {
  created() {
  getgoods().then(d => {
      console.log(d.data.data);
      this.$store.commit('initGoodsList', d.data.data)

    });
  },
  mounted() {
    new BScroll(document.querySelector(".scroll"), {
      click: true
    });

  },
  methods: {
    allprice() {
      var total = 0;
      this.getgoods.forEach(f => {
        f.foods.forEach(y => {
          if (y.num > 0) {
            total += y.num;
          }
        });
      });
        return total;
    },
    clicklow(name) {
      this.$store.commit("lowNum", name);
       console.log(this.$store.state.goodslist);
    },
    clickup(name) {
      this.$store.commit("addNum", name);
       console.log(this.$store.state.goodslist);
    }
  },
  computed: {
    getGoodslist() {
      return this.$store.getters.getAdult;
    },
    getgoods() {
      return this.$store.state.goodslist;
    }
  }
};
</script>

<style scoped lang="less">
p {
  padding: 0px 20px;
  line-height: 40px;
  background: #ccc;
}
.scroll {
  height: 200px;
  overflow-y: auto;
  .shop {
    display: flex;
    justify-content: space-between;
    line-height: 50px;
    font-size: 14px;
    border-bottom: #ccc 1px solid;
    margin: 0 20px;
    .shopcarleft {
      width: 50%;
      font-size: 16px;
      font-family: "宋体";
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 150px;
    }
    .shopcarmiddle {
      width: 25%;
      color: red;
    }
    .shopcarright {
      width: 25%;
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
              margin: 15px 5px;
              background: rgb(0, 159, 220);
              font-size: 16px;
              color: #fff;
            }
          }
    }
  }
}
</style>