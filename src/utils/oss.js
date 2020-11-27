var OSS = require('ali-oss')
export function client() {
    var client = new OSS({
        region: 'oss-cn-shenzhen',
        accessKeyId: 'LTAI4GGLtKktjfXuqT2sq5Lx',
        accessKeySecret: 'x9osjP3ugZTF4RPIz4Etj0TtREGn1B',
        bucket: 'testcodethunder'
    }) //后端提供数据
    return client
}