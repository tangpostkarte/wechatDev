<?php
namespace app\admin\validate;

use think\Validate;

class Setting extends Validate
{
    protected $rule = [
        'appid'  =>  'require|length:1,255',
        'appsecret' =>  'require|length:1,255'
    ];

    protected $message  =   [
        'appid.require' => 'AppID必填',
        'appsecret.require' => 'AppSecret必填'
    ];
}
