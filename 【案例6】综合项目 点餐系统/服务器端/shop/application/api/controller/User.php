<?php
namespace app\api\controller;

use app\common\controller\Api;
use app\common\library\facade\Setting as Setting;
use app\api\model\User as UserModel;
use think\facade\Session;

class User extends Api
{
    protected $checkLoginExclude = ['checklogin', 'login']; // 必须全小写

    public function checkLogin()
    {
        return json(['isLogin' => Session::has('user')]);
    }

    public function login()
    {
        $js_code = $this->request->get('js_code/s', '');
        $appid = Setting::get('appid');
        $secret = Setting::get('appsecret');
        $url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' . $appid . '&secret=' . $secret . '&js_code=' . $js_code . '&grant_type=authorization_code';
        $data = json_decode($this->request($url, 'GET'), true);
        if (isset($data['openid'])) {
            $openid = $data['openid'];
            $user = UserModel::get(['openid' => $openid]);
            if (!$user) {
                $user = UserModel::create(['openid' => $openid]);
            }
            Session::set('user', ['id' => (int)$user->id, 'openid' => $openid]);
            return json(['isLogin' => true]);
        }
        return json(['isLogin' => false]);
    }
}
