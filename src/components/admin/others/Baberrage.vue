<template>
    <div class="video-main">
        <div v-if="true">
            <video :src="'‪E://5e888e58acd775eb43d557ca25a708c4.mp4'"></video>
        </div>
        <Button icon="ios-cloud-upload-outline" @click="uploadFile">Upload files</Button>
        <input ref="upload" id="upload" type="file" hidden @change="getfile"/>
    </div>
</template>
<script>
export default {
    name: 'Baberrage',
    data() {
        return {
            videoSrc:''
        }
    },
    methods: {
        uploadFile() {
            this.$refs.upload.click();
        },
        getfile(e) {
            let target = e.target || e.srcElement;
            let file = target.files[0];
            console.log(this.getObjectURL(file));
            console.log(file, document.getElementById('upload').files[0]);
            // this.videoSrc = file.name;
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
    }
}
</script>
<style lang="scss" scoped>
.video-main {
    padding: 20px;
    height: 100%;
}
</style>