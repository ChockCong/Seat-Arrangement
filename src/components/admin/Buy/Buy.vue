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
                                <Button v-if="!item.bought" type="primary" @click="bought(item, $event)">{{ '购买' }}</Button>
                                <Icon v-else type="md-checkmark-circle-outline" class="icon-click" />
                            </div>
                        </div>
                    </div>
                </template>
            </div>
            <Drawer title="已选功能" class-name="menu-popup" :transfer="false" :inner="true"  v-model="drawer">
                <template v-if="selectedMenu.length">
                    <div class="selecteds" v-for="(item, index) in selectedMenu" :key="index">
                        <span>{{item.text}}</span>
                        <!-- <Select v-model="model15" prefix="ios-home" style="width:200px">
                            <Option :value="item.value" :label="''"></Option>
                        </Select> -->
                        <Icon type="ios-close" @click="popSelected(item)" />
                    </div>
                </template>
                <template v-else>
                    空
                </template>
            </Drawer>
        </div>
        <div class="bottom-area">
            <div class="shop-menu" @click="showDraw">
                <div class="shop-car">
                    <div class="tip">{{ selectedMenu.length }}</div>
                    <Icon type="md-list" />
                </div>
                <!-- <template slot="content">
                    <template v-for="(item, index) in selectedMenu">
                        <div class="selecteds" :key="index">
                            <span>{{item.text}}</span>
                            <Icon type="ios-close" @click="popSelected(item)" />
                        </div>
                    </template>
                </template> -->
            </div>
            <div class="price">
                <span>{{ `总费用：￥` }}{{showPrice | FormatNum}}</span>
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
            selectedMenu: [],
            showPay: false,
            drawer: false
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
        showDraw() {
            this.drawer = !this.drawer;
        },
        bought(item, e) {
            this.menu.forEach(val => {
                if (val.text === item.text && !val.bought) {
                    val.bought = true;
                    this.totalPrice += Math.random(0,1) * 10 + 1;
                    this.selectedMenu.push(val);
                }
            });
            this.$forceUpdate();
        },
        popSelected(item) {
            let index = this.selectedMenu.findIndex(val => { return val.text === item.text; });
            this.selectedMenu.splice(index, 1);
            this.menu.forEach((val, index) => {
                if (val.text === item.text) {
                    this.totalPrice -= Math.random(0,1) * 10 + 1;
                    val.bought = false;
                    
                }
            });
            if (!this.selectedMenu.length) this.drawer = false;
            else this.drawer = true;
            // this.$nextTick(() => {
            //     if (!this.selectedMenu.length) this.drawer = false;
            //     else this.drawer = true;
            // })
            // this.$forceUpdate();
        }
    }
}
</script>
<style lang="scss" scoped>
.index-vue-buy {
    height: 100vh;
    display: flex;
    flex-direction: column;
    & .title {
        font-size: 14px;
        font-weight: bold;
        text-align: left;
        padding: 5px 10px;
        color: white;
        background-color: #2d8cf0;
        box-shadow: 0 0 5px #000;
    }
    & .content-area {
        flex: 1;
        padding: 20px;
        overflow: auto;
        position: relative;
        & .function-list {
            display: flex;
            flex-wrap: wrap;
            max-width: 1070px;
            margin: 0 auto;
            overflow: auto;
            padding: 10px;
            & .function-item {
                padding: 5px;
                width: 210px;
                height: 300px;
                margin: 0 60px 30px 0;
                &:nth-child(4n+0) {
                    margin-right: 0px;
                }
                box-sizing: border-box;
                &-content {
                    height: 100%;
                    border-radius: 10px;
                    padding: 10px 20px;
                    border: 1px solid #57a3f3;
                    background-color: white;
                    display: flex;
                    flex-direction: column;
                    box-sizing: border-box;
                    &:hover {
                        // border: 2px solid #57a3f3;
                        border: 1px solid white;
                        transform: scale(1.1);
                        box-shadow: 5px 5px 10px #000;
                    }
                    &.bought {
                        border: 1px solid white;
                        box-shadow: 5px 5px 15px #282828;
                        // border: 2px solid #57a3f3;
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
                            & .icon-click {
                                font-weight: bold;
                                color: #57a3f3;
                                font-size: 30px;
                            }
                        }
                    }
                }
            }
        }
        & .menu-popup {
            & .selecteds {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 13px;
                padding-bottom: 5px;
                & i {
                    font-size: 25px;
                    cursor: pointer;
                    &:hover {
                        font-weight: bold;
                    }
                }
            }
        }
    }
    & .bottom-area {
        position: relative;
        box-shadow: 0 0 5px #000;
        background-color: #515a6e;
        height: 80px;
        display: flex;
        justify-content: flex-end;
        padding: 0 20px;
        align-items: center;
        & .price {
            font-size: 20px;
            color: white;
            margin-right: 20px;
        }
        & .shop-menu {
            position: absolute;
            top: -50px;
            right: 20px;
            & .tip {
                position: absolute;
                border-radius: 50%;
                width: 16px;
                height: 16px;
                // z-index: 3;
                background-color: red;
                color: white;
                top: -3px;
                right: -3px;
                transition: 0.5s all cubic-bezier(0.14,-1.33,1,0.18);
            }
            & .shop-car {
                position: relative;
                box-shadow: -2px -2px 10px #515a6e;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                background-color: #f90;
                color: white;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                z-index: 1002;
                & i {
                    font-size: 24px;
                }
            }
        }
    }
}
</style>