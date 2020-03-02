import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default  new Vuex.Store({
    state:{
        goodslist: [] 
    },
    mutations:{
        initGoodsList(state, newArr) {
            state.goodslist = newArr
        },
        addNum(state,name){
            var arr = [...state.goodslist]
            arr.forEach(v=>{
                v.foods.forEach(k=>{
                    if(k.name==name){
                        k.num+=1
                    }
                })
            })
            state.goodslist = arr
        },
        lowNum(state,name){
            var arr = [...state.goodslist]
            arr.forEach(v=>{
                v.foods.forEach(k=>{
                    if(k.name==name){
                        k.num-=1
                    }
                })
            })
            state.goodslist = arr
        },
    },
    getters: {
        //getter和mutation一样，每一个getter函数，都会接受state形参
        // getAdult(state) {
        //     return state.goodslist.filter(obj => obj.foods.num=0)
        // }
        getAdult(state){
            for(let i=0; i<state.goodslist.length; i++){
                return state.goodslist[i].foods.filter( obj=> obj.num>0 )
            }
        }
    }
})



