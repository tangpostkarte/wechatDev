<?php
namespace app\admin\validate;

use think\Validate;

class Category extends Validate
{
    protected $rule = [
        'name'  =>  'require|length:1,255',
        'sort' =>  'require|max:99999|min:-9999'
    ];

    protected $message  =   [];
}
