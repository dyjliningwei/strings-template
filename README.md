#string template
####字符串解析、反解析
#Installation
```
npm install strings-template
```
###使用方法
```
const st=require("strings-template");

// 解析字符串
const cmdStr = '21[len]0901[url]FS0140;';
const url = 'http://test.cn';
const len = url.length;
const rep = st.expandTemplate(cmdStr, { url, len });
console.log('rep', rep);  //  21140901http://test.cnFS0140;


// 反解析
const str = '21140901http://test.cnFS0140;';
const vs = 'header:2;len:2;cmd:2;form:2;url:0;crc:4;end:2;';
const strRepObj = st.parseTemplate(str, vs);
console.log('strRepObj', strRepObj); 
{
  header: '21',
  len: '14',
  cmd: '09',
  form: '01',
  url: 'http://test.cn',
  crc: 'FS01',
  end: '40'
}
```