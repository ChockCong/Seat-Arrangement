<template>
    <div class="index-vue-buy">
        <Header></Header>
        <div class="ad-carousel">
            <Carousel autoplay v-model="carousel" :autoplay-speed="2000" loop>
                <CarouselItem>
                    <div class="demo-carousel">广告宣传-1</div>
                </CarouselItem>
                <CarouselItem>
                    <div class="demo-carousel">广告宣传-2</div>
                </CarouselItem>
            </Carousel>
        </div>
        <!-- <div class="title">
                {{ '功能列表' }}
        </div> -->
        <div class="content-area">
            <div class="function-list">
                <template v-for="(item, index) in menu">
                    <div class="function-item" :key="index">
                        <div class="function-item-content" :class="item.bought ? 'bought' : ''">
                            <div class="img">
                                <img alt="Vue logo" src="//product4.djicdn.com/uploads/spu/cover/929cf1848642494cc2e3c920c3aa3af1@retina_small.png">
                            </div>
                            <div class="content-detail">
                                {{`功能${index}:介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍`}}
                            </div>
                            <div class="content-button">
                                <div class="time-type" v-if="!item.bought">
                                    <!-- <template v-if="item.showTime">
                                        <Input v-model="item.timeValue" @input="item.timeValue = item.timeValue.replace(/[^0-9]$/, '')" style="width:40px"/>
                                        <Select v-model="item.timeType" style="width:50px">
                                            <Option :value="'month'">{{ '月' }}</Option>
                                            <Option :value="'year'">{{ '年' }}</Option>
                                        </Select>
                                    </template> -->
                                    <Button type="primary" @click="bought(item, $event)">{{ '确定' }}</Button>
                                </div>
                                <Icon v-else type="md-checkmark-circle-outline" class="icon-click" />
                            </div>
                        </div>
                    </div>
                </template>
            </div>
            <Drawer title="已选功能" class-name="menu-popup" width="300" :closable="false" :transfer="false" :inner="true"  v-model="drawer">
                <template v-if="selectedMenu.length">
                    <div class="selecteds" v-for="(item, index) in selectedMenu" :key="index">
                        <span style="width: 60px;">{{item.text}}</span>
                        <Input v-model="item.timeValue" :disabled="!item.edit"  @input="item.timeValue = item.timeValue.replace(/[^0-9]$/, '')" style="width:40px"/>
                        <Select v-model="item.timeType" :disabled="!item.edit" style="width:50px">
                            <Option :value="'month'">{{ '月' }}</Option>
                            <Option :value="'year'">{{ '年' }}</Option>
                        </Select>
                        <Button size="small" type="primary" @click="editTime(item)">{{ item.edit ? '确定' : '编辑' }}</Button>
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
                    <div class="tip">
                        <span>{{ selectedMenu.length }}</span>
                    </div>
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
                <Button type="warning" @click="()=>{ drawer = false; showPay = true; }">{{ '立刻购买' }}</Button>
            </div>
        </div>
        <Pay v-model="showPay"></Pay>
        <Modal
            v-model="showTime"
            :title="'选择购买时限'"
            :loading="false"
            :width="700">
            <div v-if="showTime" class="time-flex">
                <Input v-model="currentItem.timeValue" @input="currentItem.timeValue = currentItem.timeValue.replace(/[^0-9]$/, '')" style="width:100px; margin-right: 20px"/>
                <Select v-model="currentItem.timeType" style="width:50px">
                    <Option :value="'month'">{{ '月' }}</Option>
                    <Option :value="'year'">{{ '年' }}</Option>
                </Select>
            </div>
            <div slot="footer">
                <Button type="primary" @click="bought()">{{ '确定' }}</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import Header from '../Header';
import menuItems from '../../../store/menu';
import Pay from './Pay';
export default {
    name: 'BuyFree',
    components: {Header, Pay},
    data() {
        return {
            totalPrice: 0,
            selectedMenu: [],
            showPay: false,
            drawer: false,
            showTime: false,
            carousel: 0,
            currentItem: {}
        }
    },
    computed: {
        menu() {
            let menus = _.cloneDeep(menuItems);
            return menus.map(val =>　{
                val.bought = false;
                val.showTime = false;
                val.edit = false;
                val.timeValue = '';
                val.timeType = 'month';
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
        bought(item = {}, e = null) {
            console.log(item, this.currentItem);
            if (!_.isEmpty(item) && _.isEmpty(this.currentItem)) {
                this.showTime = true;
                this.currentItem = _.cloneDeep(item);
                console.log(1, this.currentItem);
            }
            else {
                if (!Number(this.currentItem.timeValue)) return this.$Message.warning({content: '请选择购买时限', closable: true});
                this.menu.forEach(val => {
                    if (val.text === this.currentItem.text && !val.bought) {
                        val.bought = true;
                        val.timeValue = this.currentItem.timeValue;
                        val.timeType = this.currentItem.timeType;
                        this.totalPrice += Math.random(0,1) * 10 + 1;
                        this.selectedMenu.push(val);
                        this.currentItem = Object.assign({});
                        console.log(2, this.currentItem);
                        this.currentItem = Object.assign({});
                    }
                });
                this.showTime = false;
            }
            this.$forceUpdate();
        },
        editTime(item) {
            if (!Number(item.timeValue)) return this.$Message.warning({content: '请选择购买时长', closable: true});
            item.edit = !item.edit;
            this.$forceUpdate();
        },
        popSelected(item) {
            let index = this.selectedMenu.findIndex(val => { return val.text === item.text; });
            this.selectedMenu.splice(index, 1);
            this.menu.forEach((val, index) => {
                if (val.text === item.text) {
                    this.totalPrice -= Math.random(0,1) * 10 + 1;
                    val.bought = false;
                    item.showTime = false;
                    val.timeValue = '';
                    val.timeType = 'month';
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
    min-width: 1080px;
    & .ad-carousel {
        // height: 200px;
        & .demo-carousel {
            height: 200px;
            line-height: 200px;
            text-align: center;
            color: #fff;
            font-size: 20px;
            background: #506b9e;
        }
    }
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
        background: #f2f2f2;
        // overflow: auto;
        position: relative;
        & .function-list {
            display: flex;
            flex-wrap: wrap;
            max-width: 1070px;
            margin: 0 auto;
            overflow: auto;
            padding: 10px;
            & .function-item {
                padding: 2px;
                width: 210px;
                height: 300px;
                margin: 0 60px 30px 0;
                &:nth-child(4n+0) {
                    margin-right: 0px;
                }
                box-sizing: border-box;
                &-content {
                    height: 100%;
                    // border-radius: 10px;
                    // padding: 10px 15px;
                    border: 1px solid #f2f2f2;
                    background-color: white;
                    display: flex;
                    flex-direction: column;
                    box-sizing: border-box;
                    &:hover {
                        // border: 2px solid #57a3f3;
                        border: 1px solid white;
                        transform: scale(1.06);
                        box-shadow: 5px 5px 10px #000;
                    }
                    &.bought {
                        // border: 1px solid white;
                        // box-shadow: 5px 5px 15px #282828;
                        // border: 2px solid #57a3f3;
                    }
                    & .img {
                        // width: 100px;
                        // height: 80px;
                        width: 100%;
                        height: 125px;
                        margin: 0 auto;
                        & img {
                            max-width: 100%;
                            max-height: 100%;
                        }
                    }
                    & .content {
                        &-detail {
                            flex: 1;
                            padding: 10px;
                            word-break: break-all;
                            text-align: left;
                        }
                        &-button {
                            padding: 10px 0;
                            text-align: center;
                            & .time-type {
                                display: flex;
                                justify-content: space-evenly;
                            }
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
        height: 60px;
        display: flex;
        justify-content: flex-end;
        padding: 0 20px;
        align-items: center;
        line-height: 60px;
        & .price {
            font-size: 18px;
            color: white;
            margin-right: 20px;
        }
        & .shop-menu {
            // position: absolute;
            // top: -50px;
            // right: 20px;
            position: fixed;
            bottom: 75px;
            z-index: 1005;
            & .tip {
                position: absolute;
                border-radius: 50%;
                width: 16px;
                height: 16px;
                background-color: red;
                color: white;
                top: -3px;
                right: -3px;
                line-height: normal;
                & span {
                    vertical-align: middle;
                }
                // transition: 0.5s all cubic-bezier(0.14,-1.33,1,0.18);
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
.time-flex {
    display: flex;
    justify-content: center;
}
</style>