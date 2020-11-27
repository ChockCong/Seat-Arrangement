var OSS = require('ali-oss')
export function client() {
    var client = new OSS({
        region: 'oss-cn-shenzhen',
        accessKeyId: process.env.VUE_APP_ALI_OSS_ID,
        accessKeySecret: process.env.VUE_APP_ALI_OSS_SECRET,
        bucket: 'testcodethunder'
    }) //后端提供数据
    return client
}