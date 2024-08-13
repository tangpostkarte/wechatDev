<?php
namespace app\admin\controller;

use app\common\controller\Admin;
use app\admin\model\User as UserModel;

class User extends Admin
{
    public function index()
    {
        $param = [];
        $user = UserModel::order('id', 'desc');
        $user = $user->paginate(10, false, ['type' => 'bootstrap', 'var_page' => 'page', 'query' => $param]);
        $this->assign('user', $user);
        $this->assign('param', $param);
        return $this->fetch();
    }
}
