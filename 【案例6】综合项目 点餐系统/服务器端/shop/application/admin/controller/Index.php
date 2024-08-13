<?php
namespace app\admin\controller;

use app\common\controller\Admin;
use app\common\library\facade\Setting;

class Index extends Admin
{
    protected $checkLoginExclude = ['login'];

    public function index()
    {
        $this->alert('info', '请在左侧选择一个操作。');
        if (!Setting::get('appid') || !Setting::get('appsecret')) {
            $this->alert('error', '您还没有配置 AppID 或 AppSecret，请转到“设置”进行配置。');
        }
        return $this->fetch();
    }

    public function login()
    {
        if ($this->request->isPost()) {
            $username = $this->request->post('username/s', '', 'trim');
            $password = $this->request->post('password/s', '');
            if ($this->auth->login($username, $password)) {
                $this->jump('index', '登录成功。');
            } else {
                $this->alert('error', $this->auth->getError());
            }
        }
        return $this->fetch();
    }

    public function logout()
    {
        $this->auth->logout();
        $this->jump('login', '退出成功。');
    }

    public function setting()
    {
        if ($this->request->isPost()) {
            $data = [
                'appid' => $this->request->post('appid/s', '', 'trim'),
                'appsecret' => $this->request->post('appsecret/s', '', 'trim'),
                'promotion' => json_encode($this->request->post('promotion/a', [], 'intval')),
                'img_swiper' => json_encode($this->request->post('img_swiper/a', [], 'trim')),
                'img_ad' => $this->request->post('img_ad/s', '', 'trim'),
                'img_category' => json_encode($this->request->post('img_category/a', [], 'trim'))
            ];
            $result = $this->validate($data, 'Setting');
            if ($result === true) {
                Setting::set($data);
                $this->alert('success', '保存成功。');
            } else {
                $this->alert('error', $result);
            }
        }
        $this->assign([
            'appid' => Setting::get('appid'),
            'appsecret' => Setting::get('appsecret'),
            'promotion' => json_decode(Setting::get('promotion'), true),
            'img_swiper' => json_decode(Setting::get('img_swiper'), true),
            'img_ad' => Setting::get('img_ad'),
            'img_category' => json_decode(Setting::get('img_category'), true)
        ]);
        return $this->fetch();
    }

    public function password()
    {
        if ($this->request->isPost()) {
            $password = $this->request->post('password/s', '', 'trim');
            $this->auth->changePassword($password);
            $this->alert('success', '密码修改成功。');
        }
        return $this->fetch();
    }
}
