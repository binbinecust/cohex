export const MAX_NAME_LEN = 20;
export const MAX_KEYWORD_LEN = 20;
export const MAX_DESC_LEN = 256;
export const PAGE_SIZE = 5;
export const FORM_ITEM_LAYOUT = {
  labelCol: {
    span: 4,
    offset: 1
  },
  wrapperCol: {
    span: 17,
    offset: 1
  }
};

export const RouteUrls =[
  {key:"1",name:"日常记录",url:"/limark/daily"},
  {key:"2",name:"报表",url:"/limark/daily1",subs:[
    {key:"2-1",name:"日常报表",url:"/limark/daily2"},
    {key:"2-2",name:"明细报表",url:"/limark/daily3"}
  ]},
  {key:"3",name:"设置",url:"/limark/daily/setting",subs:[
    {key:"3-1",name:"账本管理",url:"/limark/daily/setting/book"}
  ]}

]

export const CALLTASK_FROM_MAP = {
  '1': '客户中心',
  '2': '呼损列表',
  '3': '客户导入',
  '4': '外呼接口',
  '5': '营销外呼'
};

export const CALLTASK_RESULT_MAP = {
  '-1': '全部结果',
  '0': '未呼叫',
  '1': '未接通',
  '2': '已接通'
};
