<template>
    <div class="video-main">
        <div class="play-area" v-if="true">
            <video controls="controls" width="520" :src="videoSrc"></video>
            <vue-baberrage
                :isShow="barrageIsShow"
                :barrageList="barrageList"
                :loop ="barrageLoop"
                class="barrage"
                >
            </vue-baberrage>
        </div>
        <Button type="primary" @click="addToList">Add barrage</Button>
        <Button icon="ios-cloud-upload-outline" @click="uploadFile">Upload files</Button>
        <input ref="upload" id="upload" type="file" hidden @change="getfile"/>
    </div>
</template>
<script>
import { MESSAGE_TYPE } from 'vue-baberrage'
export default {
    name: 'Baberrage',
    data() {
        return {
            videoSrc:'',
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
                avatar: "./static/avatar.jpg",
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
        }
    },
    beforeMounted() {
        this.addToList();
    }
}
</script>
<style lang="scss" scoped>
.video-main {
    padding: 20px;
    height: 100%;
    & .play-area {
        position: relative;
        height: auto;
        width: 100%;
    }
    & .barrage {
        position: absolute;
        width: 100% !important;
        height: 100%;
        z-index: 3;
        top: 0;
    }
}
</style>