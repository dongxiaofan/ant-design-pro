// 数据接口地址
// var env = 'develop' // 本地测试时使用
var env = 'test' // 本地测试时使用线上测试地址
// var env = 'build' // 测试打包发布时使用
// var env = 'production' // 正式打包发布时使用

export class AppConfig {
  static env = env
  // static serverURL = env === 'develop' ? 'http://10.10.10.117:81' : (env === 'build' ? 'http://www.vxhro.com:81' : 'https://www.vxhro.com')

  static serverURL = () => {
    if (env === 'develop') {
      return 'http://10.10.10.117:81'
    } else if (env === 'test') {
      return 'http://www.vxhro.com:81'
    } else if (env === 'build') {
      return 'http://www.vxhro.com:81'
    } else {
      return 'https://www.vxhro.com'
    }
  }
  static apiURL = (env === 'develop' || env === 'test') ? '/apidata' : (env === 'build' ? 'http://www.vxhro.com:81/api' : 'https://www.vxhro.com/api')
}
