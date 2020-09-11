<template>
<div class="index-vue-main">
    <div class="ad-carousel">
        <Carousel autoplay v-model="carousel" :autoplay-speed="3000" :arrow="'never'" loop>
            <CarouselItem>
                <div class="demo-carousel">
                    <img src="https://www1.djicdn.com/cms/uploads/2e2375062b1f0a7a717358036c6b381c.jpg" />
                </div>
            </CarouselItem>
            <CarouselItem>
                <div class="demo-carousel">
                    <img src="https://img.zcool.cn/community/01b5555a0d934ca80121985ce63b3b.jpg@1280w_1l_2o_100sh.jpg" />
                </div>
            </CarouselItem>
        </Carousel>
    </div>
    <div class="index-vue-main-content">
        <div class="content-title">码雷将为你提供更便捷的服务</div>
        <div class="content-block">
            <template v-for="(item, index) in showItems">
                <div class="content-item" :key="index">
                    <!-- <transition name="layout">
                        <div v-if="item.hoverIt" class="lay-out"></div>
                    </transition> -->
                    <img :src="item.img" @mouseenter="hoverImg(index, true)"  @mouseout="hoverImg(index, false)" />
                    <div class="text-box theme-light">
                        <div class="headline">{{item.name}}</div>
                        <div class="desc">{{item.desc}}</div>
                        <div href="" class="link-box">
                            <div class="text">了解更多</div>
                            <div class="icon fa fa-angle-right">
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
    <div class="index-vue-main-introduc">
        <div class="introduc-content">
            <h1>会场敏捷专家</h1>
            <p>互联网+会场，从准备到布置再到流程以及场内互动，一站式管理您的会场，让您成为主角，带给用户新式体验</p>
            <div class="click">了解更多</div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'Index',
    data() {
        return {
            showItems: [
                { name: '会场系统', desc: '宴会/会议便捷解决方案', img: 'https://www1.djicdn.com/cms/uploads/bccdb5d218eb2c32dccb5c88babc7679@1x.webp', hoverIt: false },
                { name: '视频互动', desc: '婚宴会场的互动新模式', img: 'https://www1.djicdn.com/cms/uploads/bccdb5d218eb2c32dccb5c88babc7679@1x.webp', hoverIt: false },
                { name: '专业影像', desc: '天地一体的专业拍摄解决方案', img: 'https://www1.djicdn.com/cms/uploads/bccdb5d218eb2c32dccb5c88babc7679@1x.webp', hoverIt: false },
                { name: '专业影像', desc: '天地一体的专业拍摄解决方案', img: 'https://www1.djicdn.com/cms/uploads/bccdb5d218eb2c32dccb5c88babc7679@1x.webp', hoverIt: false },
                { name: '专业影像', desc: '天地一体的专业拍摄解决方案', img: 'https://www1.djicdn.com/cms/uploads/bccdb5d218eb2c32dccb5c88babc7679@1x.webp', hoverIt: false }],
            hoverIt: false
        }
    },
    methods: {
        hoverImg(index, type) {
            this.showItems[index].hoverIt = type;
            this.$forceUpdate();
        }
    }
}
</script>

<style lang="scss" scoped>
.layout-enter-active {
  transition: all .2s ease;
}
.layout-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.layout-enter, .layout-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.index-vue-main {
    width: 100%;
    &-introduc {
        width: 100%;
        height: 300px;
        background: lightgrey;
        & .introduc-content {
            width: 1200px;
            height: 100%;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            & h1 {
                font-size: 45px;
            }
            & p {
               font-size: 14px;
            }
            & .click {
                display: inline-block;
                width: 130px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                font-size: 14px;
                color: #f68b1f;
                border: 1px solid #f68b1f;
                border-radius: 21px !important;
                margin-top: 30px;
                text-decoration: none;
                &:hover {
                    background: #f68b1f;
                    color: white;
                }
            }
        }
    }
    &-content {
        width: 1200px;
        box-sizing: border-box;
        margin: 0 auto;
        /* height: 100%; */
         & .content-title {
            padding: 10px 0 0 0;
            font-size: 40px;
            line-height: 44px;
            font-weight: 500;
            color: rgba(0,0,0,.85);
            text-align: center;
            padding: 20px 0;
        }
        & .content-block {
            padding: 0 0 10px 0;
            display: flex;
            flex-wrap: wrap;
            & .content-item {
                width: 389px;
                height: 512px;
                display: block;
                margin: 0 5px 10px;
                overflow: hidden;
                position: relative;
                color: white;
                &:nth-child(3n) {
                    margin-right: 0
                }
                & .lay-out {
                    position: absolute;
                    height: 100%;
                    width: 100%;
                    background: rgba(0,0,0,.4);
                    z-index: 1;
                }
                & img {
                    max-width: 100%;
                    transition: all .6s ease;
                    &:hover {
                        transform: scale(1.2);
                    }
                }
                & .text-box {
                    padding: 0 48px;
                    position: absolute;
                    z-index: 2;
                    top: 48px;
                    width: 100%;
                    & .headline {
                        font-size: 32px;
                    }
                    & .desc {
                        font-size: 16px;
                    }
                    &:hover {
                        // font-weight: bold;
                        background: rgba(0,0,0,.8);
                        // height: 100%;
                    }
                }
                & .link-box {
                    position: relative;
                    z-index: 400;
                    text-align: center;
                    margin-top: 16px;
                    display: inline-flex;
                    align-items: center;
                    transition: all .3s ease;
                    cursor: pointer;
                    &:hover {
                        text-decoration: underline;
                    }
                    margin-left: 8px;
                    font-size: 16px;
                }
            }
        }
    }
    & .ad-carousel {
        & .demo-carousel {
            height: 500px;
            line-height: 500px;
            text-align: center;
            color: #fff;
            font-size: 20px;
            // background: lightgray;
            & img {
                width: 100%;
                height: 100%
            }
        }
    }
}
</style>