<?php
namespace app\common\library;

use app\common\model\Setting as SettingModel;

class Setting
{
    protected $data;

    public function __construct()
    {
        foreach (SettingModel::all() as $v) {
            $this->data[$v['name']] = $v['value'];
        }
    }

    public function get($name)
    {
        return isset($this->data[$name]) ? $this->data[$name] : null;
    }

    public function set($name, $value = null)
    {
        if (is_array($name)) {
            $data = [];
            foreach ($name as $k => $v) {
                $data[] = ['name' => $k, 'value' => $v];
                $this->data[$k] = $v;
            }
            SettingModel::insertAll($data, true);
            return $this;
        }
        $this->data[$name] = $value;
        return $this;
    }
}
