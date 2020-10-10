<template>
 <!-- @mousemove="hoverControl" -->
        <div class="index-vue-video-main">
            <Drawer title="播放列表" class-name="menu-popup" width="300" :closable="true" :transfer="false" :inner="true"  v-model="drawer">
                <Button icon="ios-cloud-upload-outline" @click="uploadFile">{{'上传视频'}}</Button>
                <div class="play-list">
                    <div v-for="(item, index) in playList" :key="index" class="play-list-item">
                        <div class="word" :class="item.url === videoSrc ? 'selected' : ''">
                            <span @click="changeList(item)">{{ item.name }}</span>
                            <Icon type="ios-close" @click="deleteList(item)" />
                        </div>
                    </div>
                </div>
            </Drawer>
            <!-- <div class="play-area" v-if="videoSrc">
                <video ref="videoAll" class="play-area-video" :src="videoSrc"  @timeupdate="commonVideoUpdata()" :loop="loop"></video>
                <vue-baberrage
                    :isShow="barrageIsShow"
                    :barrageList="barrageList"
                    :loop ="barrageLoop"
                    class="barrage"
                    >
                </vue-baberrage>
            </div> -->
            <section class="top-btn">
                <Button class="baberrage-btn" type="primary" @click="addToList">{{'测试弹幕'}}</Button>
                <Button class="menu-btn icon-correct" type="primary" icon="md-list" @click="drawer = !drawer"></Button>
            </section>
            <div id="vs" v-show="videoSrc"></div>
            <div class="play-area"  v-if="!videoSrc">
                <div class="play-area-video-null">
                    <h2>{{'视频区域'}}</h2>
                    <Button icon="ios-cloud-upload-outline" @click="uploadFile">{{videoSrc ? '重新上传' : '上传视频'}}</Button>
                </div>
            </div>
            <!-- <div class="button-area" @mouseenter="initControl(true)" @mouseleave="initControl(false)" v-if="videoSrc">
                <section class="control-bar" v-if="showControl">
                    <div class="progress">
                        <Slider class="bar" v-model="currentTimeProgress" @on-change="progressChange" @click="progressChange"></Slider>
                        <span class="time">{{returnTime()}}</span>
                    </div>
                    <div class="btn">
                        <div class="loop-item">
                            <label>{{'循环：'}}</label>
                            <SwitchTab v-model="loop">
                                <span slot="open">{{'开'}}</span>
                                <span slot="close">{{'关'}}</span>
                            </SwitchTab>
                        </div>
                        <Button class="icon-correct" type="primary" shape="circle" :icon="'ios-square'" @click="stop"></Button>
                        <Button class="icon-correct" shape="circle" :icon="'ios-rewind'" @click="changeTime('back')"></Button>
                        <Button type="primary" shape="circle" :class="playing ? 'icon-correct' : ''" :icon="playing ? 'ios-pause' : 'ios-play'" @click="play"></Button>
                        <Button shape="circle" :icon="'ios-fastforward'" @click="changeTime('forward')"></Button>
                        <div style="width: 100px;margin-left: 10px">
                            <Slider v-model="slider" @on-input="volumeChange"></Slider>
                        </div>
                        <Button class="baberrage-btn" type="primary" @click="addToList">{{'测试弹幕'}}</Button>
                        <Button class="full-screen icon-correct" type="primary" @click="full" shape="circle" :icon="!fullScreen ? 'md-expand' : 'md-contract'"></Button>
                        <Button class="menu-btn icon-correct" type="primary" shape="circle" icon="md-list" @click="drawer = !drawer"></Button>
                    </div>
                </section>
            </div> -->
            <input ref="upload" id="upload" type="file" hidden @change="getfile"/>
        </div>
</template>
<script>
import Player from 'xgplayer';
import { MESSAGE_TYPE } from 'vue-baberrage'
import logo from '../../../assets/logo.png';
import { setInterval, clearInterval } from 'timers';
export default {
    name: 'baberrage',
    // components: {
    //     Xgplayer 
    // },
    data() {
        return {
            videoSrc:'',
            loop: false,
            playing: false,
            pause: false,
            msg: 'Hello vue-baberrage',
            barrageIsShow: true,
            currentId : 0,
            barrageLoop: true,
            barrageList: [],
            slider: 100,
            showControl: false,
            drawer: false,
            currentTimeProgress: 0,
            playList: [],
            timer: null,
            inControl: false,
            player: null,
            danmuFirst: false,
            DOMel: `<div class='danmu'>123</div>`
        }
    },
    computed: {
        fullScreen() {
            return this.$store.state.fullScreen;
        },
        xgPlayList() {
            return this.playList.map(item => {
                return item.url;
            })
        }
    },
    watch: {
        // currentTimeProgress(value) {
        //     let index = this.playList.findIndex(val => { return val.url === this.videoSrc });
        //     if (value === 100) {
        //         if (index < this.playList.length - 1) {
        //             this.changeList(this.playList[index + 1], true);
        //         } else {
        //             this.changeList(this.playList[0], true);
        //         }
        //     }
        // },
        // showControl(value) {
        //     if (value) {
        //         if (this.timer) clearTimeout(this.timer);
        //         let timeout = setTimeout(() => {
        //             this.showControl = false;
        //         }, 8000);
        //         this.timer = timeout;
        //     }
        // },
        // inControl(value) {
        //     if (this.timer) clearTimeout(this.timer);
        //     if (!value) {
        //         let timeout = setTimeout(() => {
        //             this.showControl = false;
        //         }, 8000);
        //         this.timer = timeout;
        //     }
        // }
    },
    methods: {
        returnTime() {
            let hours_1 = 0;
            let minutes_1 = 0;
            let seconds_1 = 0;
            let hours_2 = 0;
            let minutes_2 = 0;
            let seconds_2 = 0;
            if (this.$refs.videoAll) {
                let currentTime = this.$refs.videoAll.currentTime.toFixed(0);
                let duration = this.$refs.videoAll.duration.toFixed(0);
                hours_1 = parseInt((currentTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                minutes_1 = parseInt((currentTime % (1000 * 60 * 60)) / (1000 * 60));
                seconds_1 = (currentTime % (1000 * 60)) / 1000;
                hours_2 = parseInt((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                minutes_2 = parseInt((duration % (1000 * 60 * 60)) / (1000 * 60));
                seconds_2 = (duration % (1000 * 60)) / 1000;
            }
            return `${hours_1}:${minutes_1}:${seconds_1}/${hours_2}:${minutes_2}:${seconds_2}`;
        },
        addToList (){
            // this.barrageList.push({
            //     id: ++this.currentId,
            //     avatar: logo,
            //     msg: this.msg,
            //     time: 5,
            //     type: MESSAGE_TYPE.NORMAL
            // });
            if (!this.danmuFirst) {
                this.player.danmu.start();
                this.danmuFirst = true;
            }
            const danmu = () => {
                console.log(this.player)
                this.player.danmu.sendComment({
                    duration: 15000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
                    id: `bili_${Math.random(0,1) * 10 + 1}`, //弹幕id，需唯一
                    // start: 1000, //弹幕出现时间，毫秒
                    // prior: true, //该条弹幕优先显示，默认false
                    color: true, //该条弹幕为彩色弹幕，默认false
                    txt: '长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕' + Math.random(0,1) * 10 + 1, //弹幕文字内容
                    style: {  //弹幕自定义样式
                        color: '#ff9500',
                        fontSize: '20px',
                        border: 'solid 1px #ff9500',
                        borderRadius: '50px',
                        padding: '5px 11px',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    },
                    // mode: 'top' //显示模式，top顶部居中，bottom底部居中，scroll滚动，默认为scroll
                    // el: this.DOMel //直接传入一个自定义的DOM元素作为弹幕，使用该项的话会忽略所提供的txt和style
                });
                this.player.danmu.play();
            };
            // setInterval(() => {
                danmu();
            // }, 1000);
        },
        uploadFile() {
            this.$refs.upload.click();
        },
        getfile(e) {
            let target = e.target || e.srcElement;
            let file = target.files[0];
            this.videoSrc = this.getObjectURL(file);
            this.playList.push({ name: file.name, url: this.videoSrc});
            if (this.playList.length > 1) {
                this.player.src = this.videoSrc;
                this.player.replay();
                this.player.pause();
            } else {
                this.player = new Player({
                    id: 'vs',
                    url: this.videoSrc,
                    height: '95%',
                    width: '100%',
                    pip: true,
                    // playNext: {
                    //     urlList: this.xgPlayList
                    // },
                    danmu: {
                        comments: [],
                        area: {  //弹幕显示区域
                            start: 0, //区域顶部到播放器顶部所占播放器高度的比例
                            end: 1 //区域底部到播放器顶部所占播放器高度的比例
                        },
                        // closeDefaultBtn: true, //开启此项后不使用默认提供的弹幕开关，默认使用西瓜播放器提供的开关
                        // defaultOff: true //开启此项后弹幕不会初始化，默认初始化弹幕
                    },
                    // defaultOff: true,
                    closeDefaultBtn: true
                });
                this.player.src = this.videoSrc;
                this.player.start(this.videoSrc);
                // this.showControl = true;
            }
        },
        getObjectURL (file) {
            let url = null ;
            if (window.createObjectURL!=undefined) { // basic
                url = window.createObjectURL(file) ;
            }else if (window.webkitURL!=undefined) { // webkit or chrome
                url = window.webkitURL.createObjectURL(file) ;
            }else if (window.URL!=undefined) { // mozilla(firefox)
                url = window.URL.createObjectURL(file) ;
            }
            return url ;
        },
        // hoverControl() {
        //     if(!this.playing) {
        //         return this.showControl = true;
        //     }
        //     this.showControl = true;
        // },
        // initControl(bol) {
        //     this.inControl = bol;
        // },
        // play(val) {
        //     if (this.playing) {
        //         this.$refs.videoAll.pause();
        //         this.pause = true;
        //         this.showControl = true;
        //     } else {
        //         this.$refs.videoAll.play();
        //         this.pause = false;
        //     }
        //     this.playing = !this.playing;
        //     // this.showControl = false;
        // },
        //  // 停止播放,显示图片清零进度条
        // stop(val) {
        //     this.$refs.videoAll.currentTime = 0;
        //     this.$refs.videoAll.pause();
        //     this.playing = false;
        // },
        // volumeChange() {
        //     this.$refs.videoAll.volume = Number(this.slider) / 100;
        // },
        // full() {
        //     let bol = this.fullScreen ? false : true;
        //     if (!this.fullScreen) this.$Message.info({content: '按Esc键退出全屏视频', closable: true});
        //     this.$store.commit('FULL_VEDIO', {status: bol});
        // },
        // changeTime(val) {
        //     // if (this.$refs.videoAll.currentTime <= 0 || this.$refs.videoAll.currentTime >= this.$refs.videoAll.duration) return;
        //     if (val === 'forward') {
        //         this.$refs.videoAll.currentTime += this.$refs.videoAll.currentTime < this.$refs.videoAll.duration ? 2 : 0;
        //     } else {
        //         this.$refs.videoAll.currentTime -= this.$refs.videoAll.currentTime > 0 ? 2 : 0;
        //     }
        // },
        // commonVideoUpdata(id) {
        //     let videoObj = this.$refs.videoAll
        //     let currTime = videoObj.currentTime //当前时间
        //     let duration = videoObj.duration //总时间
        //     let pre = currTime / duration
        //     this.currentTimeProgress = pre * 100;
        // },
        // progressChange(e) {
        //     this.$refs.videoAll.currentTime = this.currentTimeProgress / 100 * this.$refs.videoAll.duration;
        // },
        changeList(item, playing = false) {
            if (this.videoSrc === item.url) return;
            this.videoSrc = item.url;
            this.player.src = this.videoSrc;
            this.player.replay();
            this.player.pause();
            this.playing = playing;
        },
        deleteList(item) {
            let index = this.playList.findIndex(val => { return val.name === item.name });
            if (this.playList[index].url === this.videoSrc) this.videoSrc = '';
            if (index > 0) {
                this.videoSrc = this.playList[index - 1].url;
            } else {
                this.videoSrc = this.playList.length > 1 ? this.playList[index + 1].url : ''
            }
            this.player.src = this.videoSrc;
            this.playList.splice(index, 1);
            if (!this.playList.length && this.player) {
                this.player.destroy();
                this.drawer = false;
            } else {
                this.player.replay();
                this.player.pause();
            }
            // this.$forceUpdate();
        }
    },
    mounted() {
        //监听键盘按键事件
        // let self = this;
        // this.$nextTick(() => {
        //     document.addEventListener('keyup', (e) => {
        //     //此处填写你的业务逻辑即可
        //         if (e.keyCode == 27 && this.fullScreen) {
        //             self.full();
        //         }
        //     })
        // })
    },
    beforeMounted() {
        // this.addToList();
    }
}
</script>
<style lang="scss" scoped>
.index-vue-video-main {
    position: relative;
    padding: 10px;
    height: 100%;
    display: flex;
    flex-direction: column;
    & .top-btn {
        padding: 5px 0;
        display: flex;
        justify-content: space-between;
    }
    & .play-area {
        position: relative;
        // height: 100%;
        flex: 1;
        width: 100%;
        &-video {
            width: 100%;
            height: 99%;
        }
        &-video-null {
            flex-direction: column;
            width: 100%;
            height: 100%;
            border: 2px gray dashed;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            & h2 {
                margin-bottom: 10px;
            }
        }
    }
    & .barrage {
        position: absolute;
        width: 100% !important;
        height: 100%;
        z-index: 3;
        top: 0;
    }
    & .button-area {
        position: absolute;
        bottom: 30px;
        width: 99%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        z-index: 10;
        // padding: 5px 0;
        height: 60px;
        & .control-bar {
            position: relative;
            background-color: rgba(#000,0.8);
            color: white;
            border-radius: 20px;
            width: 95%;
            box-shadow: 1px 1px 5px black;
            padding: 10px 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            ::v-deep .ivu-btn {
                &.icon-correct {
                    & i {
                        // font-size: 18px;
                        margin: 1px -1px 0 0;
                    }
                }
                & i {
                    font-size: 18px;
                    margin: 1px -3px 0 0;
                }
            }
            & .progress {
                display: flex;
                align-items: center;
                width: 98%;
                padding: 0 5px;
                & .bar {
                    flex: 1;
                }
                & .time {
                    width: 100px;
                }
            }
            & .btn {
                width: 100%;
                height: 100%;
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
        & section {
            & .loop-item {
                margin-right: 10px;
                font-size: 13px;
                & label {
                    vertical-align: middle;
                }
            }
            & button {
                margin-right: 10px;
                &:last-child {
                    margin-right: 0;
                }
                &.baberrage-btn {
                    position: absolute;
                    left: 10px;
                }
                &.menu-btn {
                    position: absolute;
                    right: 10px;
                }
                &.full-screen {
                    position: absolute;
                    right: 40px;
                }
            }
            // &:last-child {
            //     position: absolute;
            //     right: 0;
            //     top: 5px;
            // }
        }
    }
    .menu-popup {
        & .play-list {
            &-item {
                font-size: 13px;
                padding: 10px 0;
                & .word {
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                }
                & span {
                    flex: 1;
                    padding: 0 5px;
                    overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
                }
                & .selected {
                    background: rgba(#2d8cf0,0.2);
                }
                & i {
                    font-size: 22px;
                    cursor: pointer;
                    &:hover {
                        font-weight: bold;
                    }
                }
            }
        }
    }
}
</style>