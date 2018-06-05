### 失败返回
```json
{
  "ec":4001,
  "em":"错误提示"
}
```

### 列表
`GET` [http://sx.zhangqing.site/api/home/topbanner?version={版本号}](http://sx.zhangqing.site/api/home/topbanner?version={版本号} "http://sx.zhangqing.site/api/home/topbanner?version={版本号}")

> Headers参数

`Accept: application/vnd.sx.v1+json`

**版本一致返回**
```json
{
  "em":{
    "version":1
  }
}
```
**版本不一致返回**
```json
{
  "em": {
    "version":2,
    "data":[{
    "id": 1,
    "title": "高端日化",
    "imgurl": "http://image.ylzsc.cn/Resource/files/2017/1706/23/f0752aa9-4f67-4c45-bc15-0b694e3094d6.jpg",
    "linkurl": "pay",
    "content": ""
  },
  {
    "id": 2,
    "title": "高端日化",
    "imgurl": "http://image.ylzsc.cn/Resource/files/2017/1706/23/f0752aa9-4f67-4c45-bc15-0b694e3094d6.jpg",
    "linkurl": "pay",
    "content": ""
  },
  {
    "id": 3,
    "title": "高端日化",
    "imgurl": "http://image.ylzsc.cn/Resource/files/2017/1706/23/f0752aa9-4f67-4c45-bc15-0b694e3094d6.jpg",
    "linkurl": "pay",
    "content": ""
  }]
  }
}
```



