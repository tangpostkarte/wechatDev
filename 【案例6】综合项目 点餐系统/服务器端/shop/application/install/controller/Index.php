<?php
namespace app\install\controller;

use think\Controller;
use think\facade\Env;
use think\Db;
use PDO;
use PDOException;

class Index extends Controller
{
    protected $error;

    public function index()
    {
        if ($this->request->isPost()) {
            if ($this->install()) {
                $this->success('安装成功', 'admin/Index/login');
            }
        }
        return $this->fetch();
    }

    protected function initialize()
    {
        if (is_file(Env::get('root_path') . 'install.lock')) {
            $this->error('系统已经安装成功');
        }
    }

    protected function install()
    {
        $hostname = $this->request->post('hostname/s', '', 'trim');
        $hostport = $this->request->post('hostport/s', '', 'trim');
        $username = $this->request->post('username/s', '', 'trim');
        $password = $this->request->post('password/s', '', 'trim');
        $database = $this->request->post('database/s', '', 'trim');
        $prefix = $this->request->post('prefix/s', '', 'trim');
        $admin_username = $this->request->post('admin_username/s', '', 'trim');
        $admin_password = $this->request->post('admin_password/s', '', 'trim');
        if (!$this->installDb($hostname, $hostport, $database, $username, $password, $prefix, $admin_username, $admin_password)) {
            $this->assign('error', $this->error);
            return false;
        }
        $this->saveConfig($hostname, $hostport, $database, $username, $password, $prefix);
        file_put_contents(Env::get('root_path') . 'install.lock', '');
        return empty($this->error);
    }

    protected function installDb($hostname, $hostport, $database, $username, $password, $prefix, $admin_username, $admin_password)
    {
        try {
            $dsn = 'mysql:host=' . $hostname . ';port=' . $hostport . ';charset=utf8mb4';
            $db = new PDO($dsn, $username, $password);
            $this->createDb($db, $database, $prefix);
            $this->importSQL($db, $database, $username, $password, $prefix, $admin_username, $admin_password);
        } catch (PDOException $e) {
            $this->error = $e->getMessage();
            return false;
        }
        return true;
    }

    protected function createDb($db, $database, $prefix)
    {
        if (!preg_match('/^[\w\d]{1,20}$/', $database)) {
            $this->error = '数据库名称由字母、数字、下划线组成。';
            return false;
        }
        if (!preg_match('/^[\w\d]{1,20}$/', $prefix)) {
            $this->error = '表前缀由字母、数字、下划线组成。';
            return false;
        }
        $db->query('CREATE DATABASE IF NOT EXISTS `' . $database . '`');
        $db->query('USE `' . $database . '`');
        $stmt = $db->query('SHOW TABLES LIKE \'' . $this->escapeSQLLike($prefix) . '%\'');
        if ($stmt->fetch()) {
            throw new PDOException('数据库中已经存在指定前缀的数据表。');
        }
    }

    protected function importSQL($db, $database, $username, $password, $prefix, $admin_username, $admin_password)
    {
        $db->query('USE `' . $database . '`');
        $data = file_get_contents(Env::get('root_path') . 'install.sql');
        $data = "\n" . str_replace("\r\n", "\n", $data) . "\n";
        // 替换前缀 CREAET TABLE
        $patt = '/[\n]+CREATE TABLE [\w ]*`pre_/i';
        $replacement = "\nCREATE TABLE IF NOT EXISTS `" . $prefix;
        $data = preg_replace($patt, $replacement, $data);
        // 替换前缀 INSERT INTO
        $patt = '/[\n]+INSERT INTO `pre_/i';
        $replacement = "\nINSERT INTO `" . $prefix;
        $data = preg_replace($patt, $replacement, $data);
        // 批量执行
        $data = explode(";\n", $data);
        foreach ($data as $sql) {
            $db->query(trim($sql));
        }
        $sql = 'INSERT INTO `' . $prefix . 'admin` (`username`,`password`,`salt`) VALUES (:username, :password, :salt)';
        $stmt = $db->prepare($sql);
        $salt = md5(microtime(true));
        $admin_password = md5(md5($admin_password) . $salt);
        $res = $stmt->execute(['username' => $admin_username, 'password' => $admin_password, 'salt' => $salt]);
        if ($res === false) {
            throw new PDOException(implode('-', $stmt->errorInfo()));
        }
    }

    protected function saveConfig($hostname, $hostport, $database, $username, $password, $prefix)
    {
        $escape_replacement = function ($str) {
            return strtr($str, ['$' => '\\$', '\\' => '\\\\']);
        };
        $env_path = Env::get('root_path') . '.env';
        $data = file_get_contents($env_path);
        foreach (['hostname', 'hostport', 'database', 'username', 'password', 'prefix'] as $v) {
            $patt = '/\n' . $v . ' = .*\n/';
            $replacement = "\n" . $v . ' = ' . $escape_replacement(var_export($$v, true)) . "\n";
            $data = preg_replace($patt, $replacement, $data);
        }
        file_put_contents($env_path, $data);
    }

    protected function escapeSQLLike($like)
    {
        return strtr($like, ['%' => '\%', '_' => '\_', '\\' => '\\\\']);
    }
}
