<template>
    <div class="index-vue-video-main" @mousemove="hoverControl">
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
        <div class="play-area" v-if="videoSrc">
            <video ref="videoAll" class="play-area-video" :src="videoSrc"  @timeupdate="commonVideoUpdata()" :loop="loop"></video>
            <vue-baberrage
                :isShow="barrageIsShow"
                :barrageList="barrageList"
                :loop ="barrageLoop"
                class="barrage"
                >
            </vue-baberrage>
        </div>
        <div class="play-area" v-else>
            <div class="play-area-video-null">
                <h2>{{'视频区域'}}</h2>
                <Button icon="ios-cloud-upload-outline" @click="uploadFile">{{videoSrc ? '重新上传' : '上传视频'}}</Button>
            </div>
        </div>
        <div class="button-area" @mouseenter="initControl(true)" @mouseleave="initControl(false)" v-if="videoSrc">
            <section class="control-bar" v-if="showControl">
                <Slider class="progress" v-model="currentTimeProgress" @on-change="progressChange"></Slider>
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
            <!-- <section>
                <Button v-if="videoSrc" type="primary" @click="addToList">{{'测试弹幕'}}</Button>
            </section> -->
        </div>
        <input ref="upload" id="upload" type="file" hidden @change="getfile"/>
    </div>
</template>
<script>
import { MESSAGE_TYPE } from 'vue-baberrage'
import logo from '../../../assets/logo.png';
import { setInterval, clearInterval } from 'timers';
export default {
    name: 'baberrage',
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
        }
    },
    computed: {
        fullScreen() {
            return this.$store.state.fullScreen;
        }
    },
    watch: {
        currentTimeProgress(value) {
            let index = this.playList.findIndex(val => { return val.url === this.videoSrc });
            if (value === 100) {
                if (index < this.playList.length) {
                    this.changeList(this.playList[index + 1]);
                } else {
                    this.changeList(this.playList[0]);
                }
            }
        },
        showControl(value) {
            if (value) {
                if (this.timer) clearTimeout(this.timer);
                let timeout = setTimeout(() => {
                    this.showControl = false;
                }, 8000);
                this.timer = timeout;
            }
        },
        inControl(value) {
            if (this.timer) clearTimeout(this.timer);
            if (!value) {
                let timeout = setTimeout(() => {
                    this.showControl = false;
                }, 8000);
                this.timer = timeout;
            }
        }
    },
    methods: {
        addToList (){
            this.barrageList.push({
                id: ++this.currentId,
                avatar: logo,
                msg: this.msg,
                time: 5,
                type: MESSAGE_TYPE.NORMAL
            });
        },
        uploadFile() {
            this.$refs.upload.click();
        },
        getfile(e) {
            let target = e.target || e.srcElement;
            let file = target.files[0];
            this.videoSrc = this.getObjectURL(file);
            this.playList.push({ name: file.name, url: this.videoSrc});
            this.showControl = true;
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
        hoverControl() {
            if(!this.playing) {
                return this.showControl = true;
            }
            this.showControl = true;
        },
        initControl(bol) {
            this.inControl = bol;
        },
        play(val) {
            if (this.playing) {
                this.$refs.videoAll.pause();
                this.pause = true;
                this.showControl = true;
            } else {
                this.$refs.videoAll.play();
                this.pause = false;
            }
            this.playing = !this.playing;
            // this.showControl = false;
        },
         // 停止播放,显示图片清零进度条
        stop(val) {
            this.$refs.videoAll.currentTime = 0;
            this.$refs.videoAll.pause();
            this.playing = false;
        },
        volumeChange() {
            this.$refs.videoAll.volume = Number(this.slider) / 100;
        },
        full() {
            let bol = this.fullScreen ? false : true;
            this.$store.commit('FULL_VEDIO', {status: bol});
        },
        changeTime(val) {
            // if (this.$refs.videoAll.currentTime <= 0 || this.$refs.videoAll.currentTime >= this.$refs.videoAll.duration) return;
            if (val === 'forward') {
                this.$refs.videoAll.currentTime += this.$refs.videoAll.currentTime < this.$refs.videoAll.duration ? 5 : 0;
            } else {
                this.$refs.videoAll.currentTime -= this.$refs.videoAll.currentTime > 0 ? 5 : 0;
            }
        },
        commonVideoUpdata(id) {
            let videoObj = this.$refs.videoAll
            let currTime = videoObj.currentTime //当前时间
            let duration = videoObj.duration //总时间
            let pre = currTime / duration
            this.currentTimeProgress = pre * 100;
        },
        progressChange(e) {
            this.$refs.videoAll.currentTime = this.currentTimeProgress;
        },
        changeList(item) {
            if (this.videoSrc === item.url) return;
            this.videoSrc = item.url;
            this.playing = false;
        },
        deleteList(item) {
            let index = this.playList.findIndex(val => { return val.name === item.name });
            if (this.playList[index].url === this.videoSrc) this.videoSrc = '';
            if (index > 0) {
                this.videoSrc = this.playList[index - 1].url;
            } else {
                this.videoSrc = this.playList.length ? this.playList[index + 1].url : ''
            }
            this.playList.splice(index, 1);
            // this.$forceUpdate();
        }
    },
    beforeMounted() {
        this.addToList();
    }
}
</script>
<style lang="scss" scoped>
.index-vue-video-main {
    position: relative;
    padding: 10px;
    height: 100%;
    & .play-area {
        position: relative;
        height: 100%;
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
                width: 98%;
                padding: 0 5px;
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