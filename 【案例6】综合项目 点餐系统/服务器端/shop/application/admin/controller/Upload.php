<?php
namespace app\admin\controller;

use app\common\controller\Admin;
use app\admin\model\Food as FoodModel;

class Upload extends Admin
{
    protected $name;
    protected $type;

    public function save()
    {
        if (!$this->request->isPost()) {
            $this->error('非法请求');
        }
        $this->name = $this->request->get('name/s');
        $this->type = $this->request->get('type/s', 'images');
        $ext_arr = [
            'images' => ['gif', 'jpg', 'jpeg', 'png', 'bmp'],
            // 'flash' => ['swf', 'flv'],
            // 'media' => ['swf', 'flv', 'mp3', 'wav', 'wma', 'wmv', 'mid', 'avi', 'mpg', 'asf', 'rm', 'rmvb'],
            // 'file' => ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'htm', 'html', 'txt', 'zip', 'rar', 'gz', 'bz2'],
        ];
        $max_size = 1000000;
        $callback = false;
        //if (in_array($this->name, ['pic', 'album', 'hot'])) {
        //    $callback = 'thumb';
        //}
        $path = $this->uploadFile($ext_arr, $max_size, $callback);
        $relation_id = $this->relationUpload($path);
        $this->success('', '', ['path' => $path, 'relation_id' => $relation_id]);
    }

    public function delete()
    {
        if (!$this->request->isPost()) {
            $this->error('非法请求');
        }
        $this->name = $this->request->post('name/s');
        $id = $this->request->get('relation_id/d');
        $relation = $this->request->get('relation/s', '', 'strtolower');
        if ($relation === 'food') {
            $this->relationUpdateFood($id, '');
        }
        $this->success('删除成功');
    }

    protected function uploadFile($ext_arr, $max_size, $callback = false)
    {
        $name = $this->name;
        $dir_name = $this->type;
        $save_path = $this->uploadPath;
        if (!empty($_FILES[$name]['error'])) {
            switch ($_FILES[$name]['error']) {
                case '1':
                    $error = '超过php.ini允许的大小。';
                    break;
                case '2':
                    $error = '超过表单允许的大小。';
                    break;
                case '3':
                    $error = '图片只有部分被上传。';
                    break;
                case '4':
                    $error = '请选择图片。';
                    break;
                case '6':
                    $error = '找不到临时目录。';
                    break;
                case '7':
                    $error = '写文件到硬盘出错。';
                    break;
                case '8':
                    $error = 'File upload stopped by extension。';
                    break;
                case '999':
                default:
                    $error = '未知错误。';
            }
            $this->error($error);
        }
        if (empty($_FILES)) {
            $this->error('请选择文件。');
        }
        $file_name = $_FILES[$name]['name'];
        $tmp_name = $_FILES[$name]['tmp_name'];
        $file_size = $_FILES[$name]['size'];
        if (!$file_name) {
            $this->error('请选择文件。');
        }
        if (is_dir($save_path) === false) {
            $this->error('上传目录不存在。');
        }
        if (is_writable($save_path) === false) {
            $this->error('上传目录没有写权限。');
        }
        if (is_uploaded_file($tmp_name) === false) {
            $this->error('上传失败。');
        }
        if ($file_size > $max_size) {
            $this->error('上传文件大小超过限制。');
        }
        if (empty($ext_arr[$dir_name])) {
            $this->error('目录名不正确。');
        }
        $temp_arr = explode('.', $file_name);
        $file_ext = strtolower(trim(array_pop($temp_arr)));
        if (in_array($file_ext, $ext_arr[$dir_name]) === false) {
            $this->error('上传文件扩展名是不允许的扩展名。只允许' . implode(',', $ext_arr[$dir_name]) . '格式。');
        }
        $sub_path = date('Y-m/d/');
        if ($dir_name !== '') {
            $sub_path = "$dir_name/$sub_path";
        }
        $save_path .= $sub_path;
        file_exists($save_path) || mkdir($save_path, 0755, true);
        $new_file_name = md5(microtime(true)) . '.' . $file_ext;
        $file_path = $save_path . $new_file_name;
        if ($callback) {
            return $this->$callback($tmp_name, $save_path, $sub_path, $new_file_name);
        }
        if (move_uploaded_file($tmp_name, $file_path) === false) {
            $this->error('上传文件失败。');
        }
        chmod($file_path, 0644);
        return $sub_path . $new_file_name;
    }

    protected function relationUpload($path)
    {
        $id = $this->request->get('relation_id/d', 0);
        $relation = $this->request->get('relation/s', '', 'strtolower');
        if ($relation === 'food') {
            return $this->relationUploadFood($id, $path);
        }
        return $id;
    }

    protected function relationUploadFood($id, $path)
    {
        $data = ['update_time' => date('Y-m-d H:i:s')];
        if ($this->name === 'image_url') {
            $data['image_url'] = $path;
        }
        $food = new FoodModel();
        if ($id) {
            $this->relationUpdateFood($id, $path);
            return $id;
        }
        $data['create_time'] = $data['update_time'];
        $food->insert($data);
        return $food->getLastInsID();
    }

    protected function relationUpdateFood($id, $new_path = '')
    {
        if (!$food = FoodModel::get($id)) {
            $this->error('未找到指定记录');
        }
        $path = '';
        if ($this->name === 'image_url') {
            $path = $food->image_url;
            $food->image_url = $new_path;
            $food->save();
        }
        if ($path !== '') {
            $file_path = $this->uploadPath . $path;
            is_file($file_path) && unlink($file_path);
        }
    }

    protected function error($msg = '', $url = null, $data = [], $wait = 3, array $header = [])
    {
        $data['__token__'] = $this->request->token();
        parent::error($msg, $url, $data);
    }

    protected function success($msg = '', $url = null, $data = [], $wait = 3, array $header = [])
    {
        $data['__token__'] = $this->request->token();
        parent::success($msg, $url, $data);
    }
}
