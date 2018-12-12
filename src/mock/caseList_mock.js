// 引入mockjs
const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;
// mock一组数据
const baseInfo = function () {
    let baseInfoList = [];
    for (let i = 0; i < 100; i++) {
        let newbaseInfoList = {
            title: Random.csentence(5, 30), //  Random.csentence( min, max )
            thumbnail_pic_s: Random.dataImage('32x32', ''), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
            author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
            date: Random.date() + ' ' + Random.time(), // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
            id: 'T' + Random.natural(100, 200),
            status: "接洽",
            type: "调查",
            caseNo: "JF00001",
            reason: "商标侵权",
            openDate: Random.date(),
            closeDate: Random.date(),
            closeMode: "和解",
            updateTime: 1519862400000,
            note: [{
                time: 1519862400000,
                item: "暂无",
                content: "暂无",
                version: -1
            }],
            date: Random.date() + ' ' + Random.time(),
            casename: Random.csentence(5, 9),
            updateInfo: [{
                updateTime: Random.date(),
                updatePerson: Random.cname(),
                item: "暂无",
                content: "暂无",
                version: -1
            }]
        }
        baseInfoList.push(newbaseInfoList)
    }

    return {
        baseInfoList: baseInfoList
    }
}

// console.info(produceNewsData)

// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/dashboard', 'post', baseInfo);


Mock.mock('/casedetail', 'get', baseInfo);
