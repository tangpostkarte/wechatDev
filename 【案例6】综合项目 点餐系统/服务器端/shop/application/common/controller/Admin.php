<?php
namespace app\common\controller;

use app\admin\library\Auth;
use think\Controller;
use think\facade\Validate;
use think\facade\Url;

class Admin extends Controller
{
    protected $auth;
    protected $checkLoginExclude = [];
    protected $uploadPath = './static/uploads/';

    protected function initialize()
    {
        $this->auth = Auth::getInstance();
        $controller = $this->request->controller();
        $action = $this->request->action();

        $this->assign('_path', $controller . '/' . $action);

        if (!in_array($action, $this->checkLoginExclude)) {
            if (!$this->auth->isLogin()) {
                $this->error('您还没有登录。', 'Index/login');
            }
            $this->assign('_admin', $this->auth->getLoginUser());
        }

        if ($this->request->isPost()) {
            if (!Validate::token(null, null, ['__token__' => $this->request->post('__token__/s')])) {
                $this->error('表单已过期，请重新提交。', '');
            }
        }
    }

    protected function alert($type, $msg = '')
    {
        if ($this->request->isAjax()) {
            if ($type === 'info') {
                $this->success($msg);
            }
            $this->$type($msg);
        }
        $this->assign($type, $msg);
    }

    protected function jump($url = null, $msg = '')
    {
        if ($this->request->isAjax()) {
            $this->success($msg);
        }
        $this->redirect($url);
    }
}
