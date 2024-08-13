
CREATE TABLE IF NOT EXISTS `pre_setting` (
  `name` VARCHAR(50) PRIMARY KEY,
  `value` LONGTEXT NOT NULL
) ENGINE=InnoDB CHARSET=utf8mb4;

INSERT INTO `pre_setting` (`name`, `value`) VALUES 
('appid', ''),
('appsecret', ''),
('promotion', '[{"k":50,"v":10}]'),
('img_swiper', '["\\/static\\/uploads\\/default\\/banner_1.png","\\/static\\/uploads\\/default\\/banner_2.png","\\/static\\/uploads\\/default\\/banner_3.png"]'),
('img_ad', '/static/uploads/default/image_ad.png'),
('img_category', '["\\/static\\/uploads\\/default\\/bottom_1.png","\\/static\\/uploads\\/default\\/bottom_2.png","\\/static\\/uploads\\/default\\/bottom_3.png","\\/static\\/uploads\\/default\\/bottom_1.png"]');


CREATE TABLE IF NOT EXISTS `pre_admin` (
  `id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  `username` VARCHAR(32) UNIQUE NOT NULL DEFAULT '',
  `password` VARCHAR(32) NOT NULL DEFAULT '',
  `salt` VARCHAR(32) NOT NULL DEFAULT ''
) ENGINE=InnoDB CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `pre_user` (
  `id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  `openid` VARCHAR(255) DEFAULT '' NOT NULL,
  `price` DECIMAL(10, 2) UNSIGNED NOT NULL DEFAULT 0,
  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `pre_category` (
  `id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL DEFAULT '',
  `sort` INT NOT NULL DEFAULT 0
) ENGINE=InnoDB CHARSET=utf8mb4;

INSERT INTO `pre_category` (`id`, `name`,`sort`) VALUES 
(1, '热销推荐', 1),
(2, '特色小吃', 2),
(3, '甜粥', 3),
(4, '凉菜', 4),
(5, '醇香奶茶', 5),
(6, '主食', 6),
(7, '小炒菜', 7),
(8, '现磨咖啡', 8),
(9, '鲜果奶茶', 9);

CREATE TABLE IF NOT EXISTS `pre_food` (
  `id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  `category_id` INT UNSIGNED NOT NULL DEFAULT 0,
  `name` VARCHAR(255) NOT NULL DEFAULT '',
  `price` DECIMAL(10, 2) UNSIGNED NOT NULL DEFAULT 0,
  `image_url` VARCHAR(255) NOT NULL DEFAULT '',
  `status` TINYINT UNSIGNED NOT NULL DEFAULT 0,
  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` DATETIME DEFAULT NULL,
  `delete_time` DATETIME DEFAULT NULL
) ENGINE=InnoDB CHARSET=utf8mb4;

INSERT INTO `pre_food` (`id`, `category_id`, `name`, `price`, `image_url`, `status`) VALUES
(1, 1, '奶香糯玉米松饼', 14, 'images/1.jpg', 1),
(2, 1, '鲜枣馍', 13, 'images/2.jpg', 1),
(3, 1, '华夫饼', 12, 'images/3.jpg', 1),
(4, 1, '琥珀珍珠奶茶（中杯）', 10, 'images/4.webp', 1),
(5, 1, '香柠咖啡（大杯）', 14, 'images/5.webp', 1),
(6, 1, '柠檬椰果养乐多/大杯', 17, 'images/6.webp', 1),
(7, 1, '芒果养乐多/大杯', 16, 'images/7.webp', 1),
(8, 1, '葡萄柚养乐多/大杯', 18, 'images/8.webp', 1),
(9, 1, '绿茶养乐多/大杯', 14, 'images/9.webp', 1),
(10, 1, '加10元得冷饮杯', 10, 'images/10.webp', 1),
(11, 1, '红茶拿铁/大杯', 14, 'images/11.webp', 1),
(12, 1, '珍珠红茶拿铁/大杯', 14, 'images/12.webp', 1),
(13, 1, '鲜醇牛奶三兄弟/中杯', 14, 'images/13.webp', 1),
(14, 1, '鲜醇草莓欧蕾/中杯', 14, 'images/14.webp', 1),
(15, 1, '鲜醇芒果欧蕾/中杯', 12, 'images/15.webp', 1),
(16, 1, '铁观音茶拿铁珍珠/大杯', 15, 'images/16.webp', 1),
(17, 2, '南瓜荷叶饼', 13, 'images/17.jpg', 1),
(18, 2, '鲜枣馍', 12, 'images/18.jpg', 1),
(19, 2, '芝士火腿包', 10, 'images/19.jpg', 1),
(20, 2, '华夫饼', 10, 'images/20.jpg', 1),
(21, 3, '红豆薏米紫米粥', 15, 'images/21.jpg', 1),
(22, 3, '枸杞酒酿玉米羹', 14, 'images/22.jpg', 1),
(23, 3, '红豆桂圆银耳羹/大份', 14, 'images/23.jpg', 1),
(24, 3, '红豆桂圆银耳羹/小份', 11, 'images/24.jpg', 1),
(25, 3, '冬瓜酥肉汤/大份', 14, 'images/25.jpg', 1),
(26, 3, '冬瓜酥肉汤/小份', 11, 'images/26.jpg', 1),
(27, 3, '土豆炖豆腐/大份', 14, 'images/27.jpg', 1),
(28, 3, '土豆炖豆腐/小份', 11, 'images/28.jpg', 1),
(29, 4, '口水鸡', 12, 'images/29.jpg', 1),
(30, 5, '鲜芋奶茶/中杯', 11, 'images/30.webp', 1),
(31, 5, '珍珠奶茶/大杯', 11, 'images/31.webp', 1),
(32, 5, '珍珠奶茶/中杯', 9, 'images/32.webp', 1),
(33, 5, '布丁奶茶/大杯', 11, 'images/33.webp', 1),
(34, 5, '布丁奶茶/中杯', 9, 'images/34.webp', 1),
(35, 5, '奶茶三兄弟/大杯', 13, 'images/35.webp', 1),
(36, 5, '奶茶三兄弟/中杯', 11, 'images/36.webp', 1),
(37, 5, '双拼奶茶/大杯', 12, 'images/37.webp', 1),
(38, 5, '双拼奶茶/中杯', 10, 'images/38.webp', 1),
(39, 5, '红豆奶茶/大杯', 12, 'images/39.webp', 1),
(40, 5, '红豆奶茶/中杯', 10, 'images/40.webp', 1),
(41, 5, 'QQ奶茶/大杯', 12, 'images/41.webp', 1),
(42, 5, 'QQ奶茶/中杯', 10, 'images/42.webp', 1),
(43, 5, '椰果奶茶/大杯', 11, 'images/43.webp', 1),
(44, 5, '椰果奶茶/中杯', 9, 'images/44.webp', 1),
(45, 5, '仙草冻奶茶/大杯', 11, 'images/45.webp', 1),
(46, 5, '仙草冻奶茶/中杯', 9, 'images/46.webp', 1),
(47, 5, '铁观音珍珠奶茶/大杯', 12, 'images/47.webp', 1),
(48, 5, '琥珀珍珠奶茶大杯 ', 12, 'images/48.webp', 1),
(49, 6, '奶香糯玉米松饼', 10, 'images/49.jpg', 1),
(50, 6, '红糖酥饼', 10, 'images/50.jpg', 1),
(51, 7, '耗油青菜小炒/大份', 12, 'images/51.jpg', 1),
(52, 7, '耗油青菜小炒/小份', 10, 'images/52.jpg', 1),
(53, 7, '鸡蛋木耳小炒/大份', 12, 'images/53.jpg', 1),
(54, 7, '鸡蛋木耳小炒/小份', 10, 'images/54.jpg', 1),
(55, 7, '可乐鸡翅', 11, 'images/55.jpg', 1),
(56, 7, '油菜沙拉/大份', 11, 'images/56.jpg', 1),
(57, 7, '油菜沙拉/小份', 9, 'images/57.jpg', 1),
(58, 8, '美式咖啡/中杯', 8, 'images/58.webp', 1),
(59, 8, '香柠咖啡/大杯', 14, 'images/59.webp', 1),
(60, 8, '拿铁咖啡/大杯', 16, 'images/60.webp', 1),
(61, 8, '拿铁咖啡/中杯', 13, 'images/61.webp', 1),
(62, 8, '卡布奇诺/大杯', 16, 'images/62.webp', 1),
(63, 8, '卡布奇诺/中杯', 13, 'images/63.webp', 1),
(64, 8, '摩卡咖啡/大杯', 19, 'images/64.webp', 1),
(65, 8, '摩卡咖啡/中杯', 16, 'images/65.webp', 1),
(66, 8, '珍珠拿铁/大杯', 16, 'images/66.webp', 1),
(67, 8, '香草拿铁/大杯', 19, 'images/67.webp', 1),
(68, 8, '香草拿铁/中杯', 16, 'images/68.webp', 1),
(69, 8, '法式奶霜咖啡/大杯', 15, 'images/69.webp', 1),
(70, 8, '海盐焦糖拿铁/大杯', 18, 'images/70.webp', 1),
(71, 8, '海盐焦糖拿铁/中杯', 15, 'images/71.webp', 1),
(72, 8, '香柠咖啡', 14, 'images/72.webp', 1),
(73, 9, '法式奶霜草莓果茶（大杯）', 15, 'images/73.webp', 1),
(74, 9, '鲜百香双响炮/大杯', 13, 'images/74.webp', 1),
(75, 9, '柠檬霸/大杯', 13, 'images/75.webp', 1),
(76, 9, '金桔柠檬汁/中杯', 11, 'images/76.webp', 1),
(77, 9, '葡萄柚绿茶/中杯', 11, 'images/77.webp', 1),
(78, 9, '草莓果茶/中杯', 10, 'images/78.webp', 1),
(79, 9, '鲜柠檬红茶/中杯', 10, 'images/79.webp', 1),
(80, 9, '鲜柠檬绿茶/中杯', 10, 'images/80.webp', 1),
(81, 9, '鲜百香绿茶/中杯', 10, 'images/81.webp', 1);

CREATE TABLE IF NOT EXISTS `pre_order` (
  `id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT UNSIGNED NOT NULL DEFAULT 0,
  `price` DECIMAL(10, 2) UNSIGNED NOT NULL DEFAULT 0,
  `promotion` DECIMAL(10, 2) UNSIGNED NOT NULL DEFAULT 0,
  `number` INT UNSIGNED NOT NULL DEFAULT 0,
  `is_pay` TINYINT UNSIGNED NOT NULL DEFAULT 0,
  `is_taken` TINYINT UNSIGNED NOT NULL DEFAULT 0,
  `comment` TEXT NOT NULL,
  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `pay_time` DATETIME DEFAULT NULL,
  `taken_time` DATETIME DEFAULT NULL
) ENGINE=InnoDB CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `pre_order_food` (
  `id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  `order_id` INT UNSIGNED NOT NULL DEFAULT 0,
  `food_id` INT UNSIGNED NOT NULL DEFAULT 0,
  `number` INT UNSIGNED NOT NULL DEFAULT 0,
  `price` DECIMAL(10, 2) NOT NULL DEFAULT 0
) ENGINE=InnoDB CHARSET=utf8mb4;
