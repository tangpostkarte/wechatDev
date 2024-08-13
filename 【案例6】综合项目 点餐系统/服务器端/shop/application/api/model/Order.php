<?php
namespace app\api\model;

use think\Model;

class Order extends Model
{
    public function orderFood()
    {
        return $this->hasMany('OrderFood');
    }
}
