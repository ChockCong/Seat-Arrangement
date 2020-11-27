var OSS = require('ali-oss')
export function client() {
    var client = new OSS({
        region: 'oss-cn-shenzhen',
        accessKeyId: 'LTAIDZ8c2xxx',
        accessKeySecret: 'yXOfrXPiuywxxxxx',
        bucket: 'testcodethunder'
    }) //后端提供数据
    return client
}