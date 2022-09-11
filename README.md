# 家居网站-server

## 上传github仓库

```
git push house_manage master
```

# 接口文档

## manage端

```javascript
#注册
请求路径： /manage/register
请求类型：post
请求参数：{
​	account_number: "",
​	password: "",
​	check_password: "",
​	sex: 1,
}
#登录
请求路径： /manage/login
请求类型：post
请求参数：{
​	account_number: "",
​	password: ""
}
```

