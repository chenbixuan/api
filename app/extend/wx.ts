
const tokenUrl = 'https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code';

export default {
  code2Session: async function (code)  {
    // @ts-ignore
    const { appId, secret }  = this.app.config.mini;
    const url = tokenUrl.replace('APPID', appId).replace('SECRET', secret).replace('JSCODE', code);
    // @ts-ignore
    const res = await this.get(url);
    console.log('res', res);
    return res
  },
}
