<template>
    <div class="index-vue-buy">
        <div class="title">
                {{ '功能列表' }}
            </div>
        <div class="content-area">
            <div class="function-list">
                <template v-for="(item, index) in menu">
                    <div class="function-item" :key="index">
                        <div class="function-item-content" :class="item.bought ? 'bought' : ''">
                            <img alt="Vue logo" src="../../../assets/logo.png">
                            <div class="content-detail">
                                {{`功能${index}:介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍`}}
                            </div>
                            <div class="content-button">
                                <Button type="primary" @click="bought(item)">{{ '购买' }}</Button>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
        <div class="bottom-area">
            <div class="price">
                <span>{{ `总费用：￥${showPrice}` }}</span>
            </div>
            <div class="button">
                <Button type="warning" @click="showPay = true">{{ '立刻购买' }}</Button>
            </div>
        </div>
        <Pay v-model="showPay"></Pay>
    </div>
</template>
<script>
import menuItems from '../../../store/menu';
import Pay from './Pay';
export default {
    name: 'Buy',
    components: {Pay},
    data() {
        return {
            totalPrice: 0,
            showPay: false
        }
    },
    computed: {
        menu() {
            return menuItems.map(val =>　{
                val.bought = false;
                return val;
            });
        },
        showPrice() {
            return Number(this.totalPrice).toFixed(2);
        }
    },
    methods:{
        back() {
            this.$router.push('info');
        },
        bought(item) {
            this.menu.forEach(val => {
                if (val.text === item.text) {
                    val.bought = true;
                    this.totalPrice += Math.random(0,1) * 10 + 1;
                }
            });
            this.$forceUpdate();
        }
    }
}
</script>
<style lang="scss" scoped>
.index-vue-buy {
    height: 100%;
    display: flex;
    flex-direction: column;
    & .title {
        font-size: 14px;
        font-weight: bold;
        text-align: left;
        padding: 5px 10px;
        color: white;
        background-color: #2d8cf0;
        box-shadow: -10px 0 5px #000;
    }
    & .content-area {
        flex: 1;
        padding: 20px;
        overflow: auto;
        & .function-list {
            display: flex;
            flex-wrap: wrap;
            max-width: 1070px;
            margin: 0 auto;
            overflow: auto;
            & .function-item {
                padding: 10px;
                width: 210px;
                height: 300px;
                box-sizing: border-box;
                &-content {
                    height: 100%;
                    border-radius: 10px;
                    padding: 10px 20px;
                    box-shadow: 5px 5px 10px #000;
                    border: 2px solid white;
                    background-color: white;
                    display: flex;
                    flex-direction: column;
                    box-sizing: border-box;
                    &:hover {
                        border: 2px solid #57a3f3;
                    }
                    &.bought {
                        border: 2px solid #57a3f3;
                    }
                    & img {
                        width: 100px;
                        height: 80px;
                        margin: 0 auto;
                    }
                    & .content {
                        &-detail {
                            flex: 1;
                            padding: 10px 0;
                            word-break: break-all;
                            text-align: left;
                        }
                        &-button {
                            padding: 10px;
                            text-align: center;
                        }
                    }
                }
            }
        }
    }
    & .bottom-area {
        // border-top: 1px solid gray;
        box-shadow: -10px 0 5px #000;
        background-color: #515a6e;
        height: 80px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        & .price {
            font-size: 20px;
            color: white;
        }
    }
}
</style>