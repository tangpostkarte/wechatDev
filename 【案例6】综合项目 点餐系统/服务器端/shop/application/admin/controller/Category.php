<?php
namespace app\admin\controller;

use app\common\controller\Admin;
use app\admin\model\Category as CategoryModel;

class Category extends Admin
{

    public function index()
    {
        $action = $this->request->post('action/s');
        if ($action === 'sort') {
            $this->sort();
        } elseif ($action === 'add') {
            $this->add();
        } elseif ($action === 'del') {
            $this->del();
        }
        $category = CategoryModel::order('sort', 'asc')->select();
        $this->assign('category', $category);
        return $this->fetch();
    }

    public function edit()
    {
        $id = $this->request->param('id/d', 0);
        if ($this->request->isPost()) {
            $data = [
                'sort' => $this->request->post('sort/d', 0),
                'name' => $this->request->post('name/s', '', 'trim'),
                'id' => $id
            ];
            $result = $this->validate($data, 'Category');
            if ($result === true) {
                CategoryModel::update($data);
                $this->alert('success', '修改分类成功。');
            } else {
                $this->alert('error', $result);
            }
        }
        $data = CategoryModel::get($id);
        if (empty($data)) {
            $this->error('指定分类不存在。');
        }
        $this->assign('category_name', $data->name);
        $this->assign('category_sort', $data->sort);
        return $this->fetch();
    }

    protected function sort()
    {
        $data = [];
        $ids = $this->request->post('sort/a', [], 'intval');
        foreach ($ids as $k => $v) {
            $data[] = ['id' => $k, 'sort' => $v];
        }
        (new CategoryModel)->saveAll($data);
        $this->alert('success', '保存排序成功。');
    }

    protected function add()
    {
        $data = [
            'name' => $this->request->post('name/s', '', 'trim'),
            'sort' => $this->request->post('sort/d', 0)
        ];
        $result = $this->validate($data, 'Category');
        if ($result === true) {
            CategoryModel::insert($data);
            $this->alert('success', '添加分类成功。');
        } else {
            $this->alert('error', $result);
        }
    }

    protected function del()
    {
        $id = $this->request->post('id/d', 0);
        CategoryModel::destroy($id);
        $this->alert('success', '删除分类成功。');
    }
}
