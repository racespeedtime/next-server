SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `isEnabled` tinyint NOT NULL DEFAULT 1,
  `sort` int NOT NULL DEFAULT 0,
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_cf51756dc07761fea6b351e061`(`code` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES ('0d5585ea-8d17-4a29-94c9-0ceb595ac1e9', 'ADMIN', '普通管理员', 1, 99, '', '2023-12-24 13:11:48.024371', '2023-12-24 13:18:05.000000');
INSERT INTO `sys_role` VALUES ('2a8eba78-47d0-4b38-a251-a785c540655a', 'USER', '普通用户', 1, 0, '', '2023-12-24 13:11:48.024371', '2023-12-24 13:17:16.000000');
INSERT INTO `sys_role` VALUES ('44018fd4-b123-4817-b85e-8a7a54f902b1', 'SUPER_ADMIN', '系统管理员', 1, 100, '', '2023-12-24 13:11:48.024371', '2023-12-24 13:17:52.000000');

-- ----------------------------
-- Table structure for sys_router
-- ----------------------------
DROP TABLE IF EXISTS `sys_router`;
CREATE TABLE `sys_router`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `component` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `redirect` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `sort` int NOT NULL DEFAULT 0,
  `type` tinyint(1) NOT NULL,
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `show` tinyint NOT NULL DEFAULT 1,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `button` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `keepAlive` tinyint NOT NULL DEFAULT 0,
  `affixTag` tinyint NOT NULL DEFAULT 0,
  `breadCrumb` tinyint NOT NULL DEFAULT 1,
  `parentId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `alwaysShow` tinyint NOT NULL DEFAULT 0,
  `localIcon` tinyint NOT NULL DEFAULT 0,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_router
-- ----------------------------
INSERT INTO `sys_router` VALUES ('1e8f75b3-c261-4403-b973-3ea044cdb21a', '/system/user', '/src/views/system/user/index.vue', '', 0, 1, 'UserFilled', 1, '用户管理', NULL, NULL, 0, 0, 1, '46cfd461-9d9a-43ed-8107-9cef4e33a14c', 0, 0, 'user');
INSERT INTO `sys_router` VALUES ('318beaeb-f91e-41b4-85bb-09964488c422', '/system/personage', '/src/views/system/personage/index.vue', '', 0, 1, 'User', 1, '个人中心', NULL, NULL, 0, 0, 1, '46cfd461-9d9a-43ed-8107-9cef4e33a14c', 0, 0, 'personage');
INSERT INTO `sys_router` VALUES ('46cfd461-9d9a-43ed-8107-9cef4e33a14c', '/system', '', '/system/user', 0, 0, 'Tools', 1, '系统管理', NULL, NULL, 0, 0, 1, NULL, 0, 0, NULL);
INSERT INTO `sys_router` VALUES ('9174ac76-a3fd-4c54-b555-124f976641e6', '/system/role', '/src/views/system/role/index.vue', '', 0, 1, 'CameraFilled', 1, '角色管理', NULL, NULL, 0, 0, 1, '46cfd461-9d9a-43ed-8107-9cef4e33a14c', 0, 0, 'role');
INSERT INTO `sys_router` VALUES ('980fa565-d6d4-4697-8df0-0f14545558a7', '/system/menu', '/src/views/system/menu/index.vue', '', 0, 1, 'Menu', 1, '菜单管理', NULL, NULL, 0, 0, 1, '46cfd461-9d9a-43ed-8107-9cef4e33a14c', 0, 0, 'menu');
INSERT INTO `sys_router` VALUES ('b91a3e97-0b1e-474e-8a2c-6f512a3a1bf8', 'af', '', 'af', 0, 0, 'koi-menu-left', 1, '123', '', '', 0, 0, 1, NULL, 0, 1, NULL);
INSERT INTO `sys_router` VALUES ('c0520435-2116-416e-9493-1b8e1df4fb8e', '', '', NULL, 0, 2, '', 1, '456215125', 'btn:add', NULL, 0, 0, 1, 'b91a3e97-0b1e-474e-8a2c-6f512a3a1bf8', 0, 0, NULL);

-- ----------------------------
-- Table structure for sys_router_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_router_role`;
CREATE TABLE `sys_router_role`  (
  `sysRouterId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `sysRoleId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`sysRouterId`, `sysRoleId`) USING BTREE,
  INDEX `IDX_058a3d900d78efd2e69d572849`(`sysRouterId` ASC) USING BTREE,
  INDEX `IDX_59adbb476e35088eec8b01b26e`(`sysRoleId` ASC) USING BTREE,
  CONSTRAINT `FK_058a3d900d78efd2e69d5728497` FOREIGN KEY (`sysRouterId`) REFERENCES `sys_router` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_59adbb476e35088eec8b01b26e8` FOREIGN KEY (`sysRoleId`) REFERENCES `sys_role` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_router_role
-- ----------------------------
INSERT INTO `sys_router_role` VALUES ('1e8f75b3-c261-4403-b973-3ea044cdb21a', '0d5585ea-8d17-4a29-94c9-0ceb595ac1e9');
INSERT INTO `sys_router_role` VALUES ('1e8f75b3-c261-4403-b973-3ea044cdb21a', '2a8eba78-47d0-4b38-a251-a785c540655a');
INSERT INTO `sys_router_role` VALUES ('1e8f75b3-c261-4403-b973-3ea044cdb21a', '44018fd4-b123-4817-b85e-8a7a54f902b1');
INSERT INTO `sys_router_role` VALUES ('318beaeb-f91e-41b4-85bb-09964488c422', '0d5585ea-8d17-4a29-94c9-0ceb595ac1e9');
INSERT INTO `sys_router_role` VALUES ('318beaeb-f91e-41b4-85bb-09964488c422', '2a8eba78-47d0-4b38-a251-a785c540655a');
INSERT INTO `sys_router_role` VALUES ('318beaeb-f91e-41b4-85bb-09964488c422', '44018fd4-b123-4817-b85e-8a7a54f902b1');
INSERT INTO `sys_router_role` VALUES ('46cfd461-9d9a-43ed-8107-9cef4e33a14c', '0d5585ea-8d17-4a29-94c9-0ceb595ac1e9');
INSERT INTO `sys_router_role` VALUES ('46cfd461-9d9a-43ed-8107-9cef4e33a14c', '2a8eba78-47d0-4b38-a251-a785c540655a');
INSERT INTO `sys_router_role` VALUES ('46cfd461-9d9a-43ed-8107-9cef4e33a14c', '44018fd4-b123-4817-b85e-8a7a54f902b1');
INSERT INTO `sys_router_role` VALUES ('9174ac76-a3fd-4c54-b555-124f976641e6', '0d5585ea-8d17-4a29-94c9-0ceb595ac1e9');
INSERT INTO `sys_router_role` VALUES ('9174ac76-a3fd-4c54-b555-124f976641e6', '2a8eba78-47d0-4b38-a251-a785c540655a');
INSERT INTO `sys_router_role` VALUES ('9174ac76-a3fd-4c54-b555-124f976641e6', '44018fd4-b123-4817-b85e-8a7a54f902b1');
INSERT INTO `sys_router_role` VALUES ('980fa565-d6d4-4697-8df0-0f14545558a7', '44018fd4-b123-4817-b85e-8a7a54f902b1');
INSERT INTO `sys_router_role` VALUES ('b91a3e97-0b1e-474e-8a2c-6f512a3a1bf8', '44018fd4-b123-4817-b85e-8a7a54f902b1');
INSERT INTO `sys_router_role` VALUES ('c0520435-2116-416e-9493-1b8e1df4fb8e', '44018fd4-b123-4817-b85e-8a7a54f902b1');

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `last_login` datetime NULL DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_83612e47a0dcc9c50e34962fd7`(`password` ASC) USING BTREE,
  UNIQUE INDEX `IDX_a78066266d5da92bbaf1f70cf8`(`email` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES ('12258352-675c-486d-82a6-3a8ea1773e6b', 'admin', '$2b$10$qVOO8GA1A401Wgr6G6qvQ.17h6P/GH6dRWVgH6CnTFTlrNUOuAUza', NULL, NULL, '2023-12-24 09:04:19.270619', '2023-12-24 09:04:19.296379', NULL);
INSERT INTO `sys_user` VALUES ('879a89f3-d6b9-49ad-b976-3727a8ce6656', 'user', '$2b$10$14xlHeLp/x8SHDepG5dVIOeF7YT9Q1Ipti2ivFzMRXRLPmNeHM2vq', NULL, NULL, '2023-12-24 09:04:19.270619', '2023-12-24 13:42:10.000000', NULL);

-- ----------------------------
-- Table structure for sys_user_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role`  (
  `sysRoleId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `sysUserId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`sysRoleId`, `sysUserId`) USING BTREE,
  INDEX `IDX_8a95a66ec39d243ef33ce4797c`(`sysRoleId` ASC) USING BTREE,
  INDEX `IDX_9e5c3a7db080c8ce6b16a631c3`(`sysUserId` ASC) USING BTREE,
  CONSTRAINT `FK_8a95a66ec39d243ef33ce4797c7` FOREIGN KEY (`sysRoleId`) REFERENCES `sys_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_9e5c3a7db080c8ce6b16a631c3a` FOREIGN KEY (`sysUserId`) REFERENCES `sys_user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------
INSERT INTO `sys_user_role` VALUES ('2a8eba78-47d0-4b38-a251-a785c540655a', '879a89f3-d6b9-49ad-b976-3727a8ce6656');
INSERT INTO `sys_user_role` VALUES ('44018fd4-b123-4817-b85e-8a7a54f902b1', '12258352-675c-486d-82a6-3a8ea1773e6b');

SET FOREIGN_KEY_CHECKS = 1;
