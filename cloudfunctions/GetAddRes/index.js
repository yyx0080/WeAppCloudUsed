// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  // 从传入的参数中获取两个数字
  const { num1, num2 } = event;

  // 检查是否传入了两个数字
  if (typeof num1 !== 'number' || typeof num2 !== 'number') {
    return {
      code: 400,
      message: '请传入两个数字'
    };
  }

  // 计算两个数字的和
  const sum = num1 + num2;
  // 返回结果
  return {
    code: 200,
    sum: sum
  };
}