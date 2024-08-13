<?php
namespace app\admin\controller;

use app\common\controller\Admin;
use app\admin\model\Category as CategoryModel;
use app\admin\model\Food as FoodModel;
use think\Db;

class Food extends Admin
{
    public function index()
    {
        if ($this->request->isPost()) {
            $action = $this->request->post('action/s', '');
            if ($action === 'del') {
                $this->del();
            }
        }
        $param = [
            'category_id' => $this->request->get('category_id/d', 0),
            'page' => max($this->request->get('page/d', 0), 1),
            'search' => $this->request->get('search/s', '', 'trim'),
            'recycle' => $this->request->get('recycle/d', 0)
        ];
        $category = CategoryModel::order('sort', 'asc')->select();
        if ($param['recycle']) {
            $food = FoodModel::onlyTrashed()->with('category');
        } else {
            $food = FoodModel::with('category');
        }
        if ($param['category_id']) {
            $food->where('category_id', '=', $param['category_id']);
        }
        if ($param['search'] !== '') {
            $search = strtr($param['search'], ['%' => '\%', '_' => '\_', '\\' => '\\\\']);
            $food->whereLike('name', '%' . $search . '%');
        }
        $food->order('id', 'desc');
        $food = $food->paginate(10, false, ['type' => 'bootstrap', 'var_page' => 'page', 'query' => $param]);
        $this->assign('param', $param);
        $this->assign('food', $food);
        $this->assign('category', $category);
        return $this->fetch();
    }

    public function edit()
    {
        $id = $this->request->param('id/d', 0);
        if ($this->request->isPost()) {
            $data = [
                'category_id' => $this->request->post('category_id/d', 0),
                'name' => $this->request->post('name/s', '', 'trim'),
                'price' => $this->request->post('price/d', 0),
                'status' => $this->request->post('status/d', 0)
            ];
            if ($id) {
                FoodModel::withTrashed()->where('id', $id)->update($data);
                $this->alert('success', '保存成功。');
            } else {
                FoodModel::create($data);
                $this->alert('success', '添加成功。');
            }
        }
        $data = ['category_id' => 0, 'name' => '', 'price' => '', 'image_url' => '', 'status' => ''];
        if ($id) {
            $data = FoodModel::withTrashed()->field(array_keys($data))->where('id', $id)->find();
        }
        if (!$data) {
            $this->error('商品记录不存在！');
        }
        $category = CategoryModel::order('sort', 'asc')->select();
        $this->assign('id', $id);
        $this->assign('category', $category);
        $this->assign('food', $data);
        return $this->fetch();
    }

    protected function del()
    {
        $id = $this->request->post('id/d', 0);
        $recycle = $this->request->get('recycle/d', 0);
        if ($recycle) {
            if (!$food = FoodModel::onlyTrashed()->get($id)) {
                $this->alert('error', '未找到指定记录');
            } else {
                $file_path = $this->uploadPath . $food->image_url;
                is_file($file_path) && unlink($file_path);
                $food->delete(true);
                $this->alert('success', '删除成功。');
            }
        } else {
            if (!$food = FoodModel::get($id)) {
                $this->alert('error', '未找到指定记录');
            } else {
                $food->delete();
                $this->alert('success', '删除成功。');
            }
        }
    }
}
