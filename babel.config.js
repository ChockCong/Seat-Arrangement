let plugins = [];
if (process.env.NODE_ENV !== 'development') {
	// https://www.babeljs.cn/docs/babel-plugin-transform-remove-console
	plugins.push('transform-remove-console');
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: plugins
}
