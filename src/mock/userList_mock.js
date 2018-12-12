// 引入mockjs
const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;
// mock一组数据


const users = function () {
    let userList = []
    for (let i = 0; i < 50; i++) {
        let newuserList = {
            id: Random.natural(1, 100),
            username: Random.word(3, 5),
            
        }

    }

}
