<?php
namespace app\api\controller;

use app\common\controller\Api;
use app\api\model\Category as CategoryModel;
use app\api\model\Food as FoodModel;
use app\api\model\Order as OrderModel;
use app\api\model\OrderFood as OrderFoodModel;
use app\api\model\User as UserModel;
use app\common\library\facade\Setting as Setting;

class Food extends Api
{
    
    public function index()
    {
        $urlFix = function ($url) {
            if (preg_match('/^https?:\/\//', $url)) {
                return $url;
            } elseif ($url[0] === '/') {
                return $this->request->domain() . $url;
            } else {
                return $this->request->domain() . '/' .substr($url, 1);
            }
        };
        $img_swiper = json_decode(Setting::get('img_swiper'), true);
        foreach ($img_swiper as $k => $v) {
            $img_swiper[$k] = $urlFix($v);
        }
        $img_ad = $urlFix(Setting::get('img_ad'));
        $img_category = json_decode(Setting::get('img_category'), true);
        foreach ($img_category as $k => $v) {
            $img_category[$k] = $urlFix($v);
        }
        return json([
            'img_swiper' => $img_swiper,
            'img_ad' => $img_ad,
            'img_category' => $img_category
        ]);
    }

    public function list2()
    {
        $url = $this->request->domain() . '/static/uploads/';
        $category = CategoryModel::field('id,name')->order('sort', 'asc')->select()->toArray();
        $food = FoodModel::field('id,category_id,name,price,image_url')->where('status', '1')->order('id', 'asc')->select()->toArray();
        foreach ($food as $k => $v) {
            $food[$k]['image_url'] = $url . $v['image_url'];
        }
        $data = [];
        foreach ($category as $k => $v) {
            $data[$k] = array_merge($v, ['food' => []]);
            foreach ($food as $kk => $vv) {
                if ($v['id'] === $vv['category_id']) {
                    $data[$k]['food'][$kk] = $vv;
                }
            }
        }
        return json([
            'list' => $data,
            'promotion' => json_decode(Setting::get('promotion'), true)
        ]);
    }

    public function order()
    {
        if ($this->request->isPost()) {
            if ($this->request->post('id/d', 0)) {
                return $this->commentOrder();
            }
            return $this->createOrder();
        }
        $id = $this->request->get('id/d', 0);
        $order = OrderModel::get($id, 'OrderFood');
        if (!$order || $order->user_id . '' !== $this->user['id'] . '') {
            $this->error('订单不存在');
        }
        $order['sn'] = $this->sn($order->id);
        $order['code'] = $this->code($order->id);
        $order['is_taken'] = (bool)$order['is_taken'];
        $order['is_pay'] = (bool)$order['is_pay'];
        $url = $this->request->domain() . '/static/uploads/';
        foreach ($order['order_food'] as $k => $v) {
            $food = FoodModel::field('name,image_url')->where(['id' => $v['food_id'], 'status' => '1'])->find();
            if (!$food) {
                continue;
            }
            $order['order_food'][$k]['image_url'] = $url . $food['image_url'];
            $order['order_food'][$k]['name'] = $food['name'];
        }
        return json($order);
    }

    public function pay()
    {
        $id = $this->request->post('id/d', 0);
        $order = OrderModel::get($id);
        if ($order && !$order->is_pay) {
            $order->is_pay = 1;
            $order->pay_time = date('Y-m-d H:i:s');
            $order->save();
            UserModel::where('id', $this->user['id'])->inc('price', $order->price)->update();
            $this->success('支付成功');
        }
        $this->error('支付失败');
    }

    public function orderlist()
    {
        $last_id = $this->request->get('last_id/d', 0);
        $row = min(max($this->request->get('row/d', 1), 1), 99);
        $order = OrderModel::where(['user_id' => $this->user['id'], 'is_pay' => 1]);
        if ($last_id) {
            $order->where('id', '<', $last_id);
        }
        $list = $order->order('id', 'desc')->limit($row)->select();
        $last_id = 0;
        if (!$list->isEmpty()) {
            $last_id = $list[count($list) - 1]['id'];
        }
        foreach ($list as $k => $v) {
            $food_id = OrderFoodModel::where('order_id', $v['id'])->limit(1)->value('food_id');
            $list[$k]['first_food_name'] = FoodModel::where('id', $food_id)->value('name');
            $list[$k]['is_taken'] = (bool)$list[$k]['is_taken'];
            $list[$k]['is_pay'] = (bool)$list[$k]['is_pay'];
        }
        return json(['list' => $list, 'last_id' => $last_id]);
    }

    public function record()
    {
        $list = OrderModel::field('id,price,pay_time')->where(['user_id' => $this->user['id'], 'is_pay' => 1])->order('id', 'desc')->select();
        return json(['list' => $list]);
    }

    protected function commentOrder()
    {
        $id = $this->request->post('id/d', 0);
        $comment = $this->request->post('comment/s', '', 'trim');
        $order = OrderModel::get($id);
        if ($order && !$order->is_pay) {
            $order->comment = $comment;
            $order->save();
            $this->success('订单备注添加成功');
        }
        $this->error('订单备注添加失败');
    }

    protected function createOrder()
    {
        $order = $this->request->post('order/a', []);
        $comment = $this->request->post('comment/s', '', 'trim');
        $food_ids = [];
        foreach ($order as $v) {
            $food_ids[(int)$v['id']] = (int)$v['number'];
        }
        $price = 0;
        $number = 0;
        $order_food = [];
        $food_data = FoodModel::field('id,category_id,name,price,image_url')->where('id', 'in', array_keys($food_ids))->where('status', '1')->select()->toArray();
        foreach ($food_data as $v) {
            $order_food[$v['id']] = [
                'food_id' => $v['id'],
                'number' => $food_ids[$v['id']],
                'price' => $v['price']
            ];
            $price += $v['price'] * $order_food[$v['id']]['number'];
            $number += $order_food[$v['id']]['number'];
        }
        $promotion = json_decode(Setting::get('promotion'), true);
        $promotion_price = 0;
        $promotion_diff = 0;
        foreach ($promotion as $v) {
            $promotion_diff2 = $price - $v['k'];
            if ($promotion_diff2 > 0 && $promotion_diff2 > $promotion_diff) {
                $promotion_price = $v['v'];
            } else {
                $promotion_diff = $promotion_diff2;
            }
        }
        $order = [
            'user_id' => $this->user['id'],
            'price' => $price - $promotion_price,
            'promotion' => $promotion_price,
            'number' => $number,
            'comment' => $comment,
            'create_time' => date('Y-m-d H:i:s')
        ];
        $order = OrderModel::create($order);
        foreach ($order_food as $k => $v) {
            $order_food[$k]['order_id'] = $order->id;
        }
        OrderModel::get($order->id)->orderFood()->saveAll($order_food);
        return json(['order_id' => $order->id]);
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
