# 蘑菇记账微信小程序版

## 关于

- 之前也没什么开发小程序的经验，做这个仅仅是因为觉得小程序好玩；
- 已经开发过一个[记账工具本地版](https://github.com/miqilin21/iMoney)，这里是想做一个小程序版的个人/家庭日常记账的 app;
- 持续开发中，有兴趣请持续关注

## 扫描预览

![蘑菇记账小程序码](https://miqilin-blog.oss-cn-shenzhen.aliyuncs.com/mogu.jpg)


## 使用步骤

1. 克隆代码:

```bash
$ cd path/to/your/workspace
$ git clone https://github.com/miqilin21/weapp-mogu-bill.git
```

2. 打开`微信Web开放者工具`

3. 导入项目

   - AppID：在 project.config.json 里改用你自己的 appid
   - 项目名称：任意填写
   - 项目目录：path/to/your/workspace
   - 点击 `添加项目`
   - 微信开发者工具界面上点击云开发，环境名称设为 test

## 开发计划

- [ ] 开发 server 端 API 接口
- [ ] 完成记账账单页
- [ ] 添加记账天数、笔数，账单导出等功能
- [ ] 规范`coding style`
