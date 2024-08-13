<?php
namespace app\admin\model;

use think\Model;

class Order extends Model
{
    public function orderFood()
    {
        return $this->hasMany('OrderFood');
    }
}
