<?php
namespace app\common\library\facade;

use think\Facade;

class Setting extends Facade
{
    protected static function getFacadeClass()
    {
        return 'app\common\library\Setting';
    }
}
