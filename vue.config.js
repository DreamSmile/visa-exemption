const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    productionSourceMap: false,
    configureWebpack: (config) => {
        config.plugins.forEach((val) => {
            if (val instanceof HtmlWebpackPlugin) {
                val.options.title = '因公免签卡申请';
            }
        })
    },
    devServer: {
        disableHostCheck: true,
        host: '0.0.0.0',
        port: 8080,
        proxy: {
            '/wxAuto': {
                target: 'http://tm.lilanz.com/oa/api/WxAuthForLilanz.ashx',
                changeOrigin: true,
                pathRewrite: {
                    '^/wxAuto': ''
                }
            },
            '/getUser': {
                target: 'http://webt.lilang.com:8901/svr-loadorder/wxFans/',
                changeOrigin: true,
                pathRewrite: {
                    '^/getUser': ''
                }
            }, '/api': {
                target: 'http://webt.lilang.com/api-proxy/lilanz-gateway/svr-develop/',
                pathRewrite: {
                    changeOrigin: true,
                    '^/api': ''
                }
            },
            '/user': {
                target: 'http://tm.lilanz.com/oa/project/MobileApplyCheck/applycheckcore.ashx',
                changeOrigin: true,
                pathRewrite: {
                    '^/user': ''
                }
            }
        }
    }
}