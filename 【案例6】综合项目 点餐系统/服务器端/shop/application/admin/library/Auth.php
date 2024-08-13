<?php
namespace app\admin\library;

use app\admin\model\Admin as AdminModel;
use think\facade\Session;

class Auth
{
    protected static $instance;
    protected $error;
    protected $isLogin;

    public function setError($error)
    {
        $this->error = $error;
        return $this;
    }

    public function getError()
    {
        return $this->error;
    }

    public static function getInstance($options = [])
    {
        if (is_null(self::$instance)) {
            self::$instance = new static($options);
        }
        return self::$instance;
    }

    public function login($username, $password)
    {
        $admin = AdminModel::get(['username' => $username]);
        if (!$admin) {
            $this->setError('用户名或密码不正确。');
            return false;
        }
        if ($admin->password != $this->password($password, $admin->salt)) {
            $this->setError('用户名或密码不正确。');
            return false;
        }
        $this->setLoginUser(['id' => $admin->id, 'username' => $admin->username]);
        return true;
    }

    public function isLogin()
    {
        if (!$this->isLogin) {
            $this->isLogin = Session::has('admin');
        }
        return $this->isLogin;
    }

    public function getLoginUser()
    {
        return Session::get('admin');
    }

    public function setLoginUser(array $userInfo)
    {
        Session::set('admin', $userInfo);
        return true;
    }

    public function logout()
    {
        Session::delete('admin');
        return true;
    }

    public function changePassword($password)
    {
        $id = $this->getLoginUser()['id'];
        $salt = $this->salt();
        $password = $this->password($password, $salt);
        AdminModel::where('id', $id)->update(['password' => $password, 'salt' => $salt]);
    }

    protected function password($password, $salt)
    {
        return md5(md5($password) . $salt);
    }

    protected function salt()
    {
        return md5(microtime(true));
    }
}
