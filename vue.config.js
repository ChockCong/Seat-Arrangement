const path = require('path');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
module.exports = {
    publicPath: '/',
    css: {
		loaderOptions: {
			postcss: {
				plugins: [
					autoprefixer(),
					pxtorem({
						rootValue: 28,
                        propList: ['*'],
                        selectorBlackList: ['login-wrap', 'upload-wrap', 'preview-wrap', '.ivu-'],
						minPixelValue: 2 // 1px的转换在安卓有问题，所以小于2px不转换
					})
				]
			}
		}
    }
}