<template>
    <div class="index-vue-video-main">
        <div class="play-area" v-if="videoSrc">
            <video ref="videoAll" class="play-area-video" :src="videoSrc" :loop="loop"></video>
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
            </div>
        </div>
        <div class="button-area">
            <section>
                <template v-if="videoSrc">
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
                </template>
            </section>
            <section>
                <Button v-if="videoSrc" type="primary" @click="addToList">{{'测试弹幕'}}</Button>
                <Button icon="ios-cloud-upload-outline" @click="uploadFile">{{videoSrc ? '重新上传' : '上传视频'}}</Button>
            </section>
        </div>
        <input ref="upload" id="upload" type="file" hidden @change="getfile"/>
    </div>
</template>
<script>
import { MESSAGE_TYPE } from 'vue-baberrage'
import logo from '../../../assets/logo.png';
export default {
    name: 'Baberrage',
    data() {
        return {
            videoSrc:'',
            loop: false,
            playing: false,
            msg: 'Hello vue-baberrage',
            barrageIsShow: true,
            currentId : 0,
            barrageLoop: true,
            barrageList: []
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
        play(val) {
            if (this.playing) {
                this.$refs.videoAll.pause();
            } else {
                this.$refs.videoAll.play();
            }
            this.playing = !this.playing;
        },
         // 停止播放,显示图片清零进度条
        stop(val) {
            this.$refs.videoAll.currentTime = 0;
            this.$refs.videoAll.pause();
            this.playing = false;
        },
        changeTime(val) {
            if (this.$refs.videoAll.currentTime <= 0 || this.$refs.videoAll.currentTime >= this.$refs.videoAll.duration) return;
            if (val === 'forward') {
                this.$refs.videoAll.currentTime += 5;
            } else {
                this.$refs.videoAll.currentTime -= 5;
            }
        }
    },
    beforeMounted() {
        this.addToList();
    }
}
</script>
<style lang="scss" scoped>
.index-vue-video-main {
    padding: 10px;
    height: 100%;
    & .play-area {
        position: relative;
        height: auto;
        width: 100%;
        &-video {
            width: 100%;
            height: calc(100vh - 160px);
        }
        &-video-null {
            width: 100%;
            height: calc(100vh - 160px);
            border: 2px gray dashed;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
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
        position: relative;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        // padding: 5px 0;
        height: 42px;
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
            }
            &:first-child {
                flex: 1;
                height: 32px;
                display: flex;
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
            }
            &:last-child {
                position: absolute;
                right: 0;
                top: 5px;
            }
        }
    }
}
</style>