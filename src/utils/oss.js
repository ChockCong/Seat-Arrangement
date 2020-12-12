var OSS = require('ali-oss');
let i = process.env.VUE_APP_ALI_OSS_ID.split('@');
let s = process.env.VUE_APP_ALI_OSS_SECRET.split('@');
export function client() {
    var client = new OSS({
        region: 'oss-cn-shenzhen',
        accessKeyId: i[0] + i[1],
        accessKeySecret: s[0] + s[1],
        bucket: 'testcodethunder'
    }) //后端提供数据
    return client
}