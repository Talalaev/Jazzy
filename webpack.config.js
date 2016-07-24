module.exports = {
    entry: {
		//"spec-compiled": "./spec.js", //раскоментировать для сбоки запускаемой в браузере (конфликтует с build, нельзя подключать точку входа как модуль)
		build: "./index.js"
	},
    output: {
        path: __dirname,
        filename: "dist/Jazzy.js",
        library: "Jazzy"
    },
	module: {
	  loaders: [
		{
		  test: /\.js$/,
		  loader: 'babel?presets[]=es2015'
		}
	  ]
	}
};