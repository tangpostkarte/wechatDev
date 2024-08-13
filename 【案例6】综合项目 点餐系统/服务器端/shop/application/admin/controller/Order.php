<?php
namespace app\admin\controller;

use app\common\controller\Admin;
use app\admin\model\Food as FoodModel;
use app\admin\model\Order as OrderModel;

class Order extends Admin
{
    public function index()
    {
        if ($this->request->isPost()) {
            $action = $this->request->post('action/s', '');
            if ($action === 'taken') {
                $this->taken();
            }
        }
        $param = [
            'is_pay' => $this->request->get('is_pay/d', -1),
            'is_taken' => $this->request->get('is_taken/d', -1),
            'page' => max($this->request->get('page/d', 1), 1),
            'search' => $this->request->get('search/s', '', 'trim'),
            'user_id' => $this->request->get('user_id/d', 0)
        ];
        $order = OrderModel::with('OrderFood')->order('id', 'desc');
        if ($param['user_id']) {
            $order->where('user_id', $param['user_id']);
        }
        if ($param['is_pay'] >= 0) {
            $order->where('is_pay', $param['is_pay']);
        }
        if ($param['is_taken'] >= 0) {
            $order->where('is_taken', $param['is_taken']);
        }
        if ($param['search'] !== '') {
            $order->where('id', ltrim($param['search'], 'A'));
        }
        $order = $order->paginate(10, false, ['type' => 'bootstrap', 'var_page' => 'page', 'query' => $param]);
        $food_ids = [];
        foreach ($order as $k => $v) {
            $order[$k]['code'] = $this->code($v['id']);
            foreach ($v['order_food'] as $vv) {
                $food_ids[] = $vv['food_id'];
            }
        }
        $food = FoodModel::field('id,name')->where('id', 'in', array_unique($food_ids))->select();
        foreach ($order as $k => $v) {
            foreach ($v['order_food'] as $kk => $vv) {
                foreach ($food as $vvv) {
                    if ($vvv['id'] === $vv['food_id']) {
                        $order[$k]['order_food'][$kk]['name'] = $vvv['name'];
                        break;
                    }
                }
            }
        }
        $this->assign('order', $order);
        $this->assign('food', $food);
        $this->assign('param', $param);
        return $this->fetch();
    }

    protected function taken()
    {
        $id = $this->request->post('id/d', 0);
        $val = $this->request->post('val/d', 0) === 1  ?: 0;
        OrderModel::where('id', $id)->update(['is_taken' => $val, 'taken_time' => date('Y-m-d H:i:s')]);
        $this->alert('success', ($val ? '发货' : '取消发货') . '成功。');
    }

    protected function sn($id)
    {
        return 'WX' . str_pad($id, 14, '0', STR_PAD_LEFT);
    }

    protected function code($id)
    {
        return 'A' . str_pad($id, 2, '0', STR_PAD_LEFT);
    }
}
