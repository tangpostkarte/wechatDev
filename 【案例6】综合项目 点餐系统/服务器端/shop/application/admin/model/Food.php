<?php
namespace app\admin\model;

use think\Model;
use think\model\concern\SoftDelete;

class Food extends Model
{
    use SoftDelete;
    protected $deleteTime = 'delete_time';
    protected $autoWriteTimestamp = 'datetime';

    public function category()
    {
        return $this->belongsTo('Category');
    }
}
