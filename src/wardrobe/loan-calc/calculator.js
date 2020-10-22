/**
 * 贷款计算器(等额本息)
 */

/**
 * 每月应还贷款
 * @param {number} a 贷款总额
 * @param {number} I 贷款年利率
 * @param {number} n 贷款期限(月)
 */
export function totalByMonth(a, I, n) {
  const i = I / 12;
  return a * i * ((1 + i) ** n) / ((1 + i) ** n - 1);
}

/**
 * 第N个月应还的利息
 * @param {number} a 贷款总额
 * @param {number} I 贷款年利率
 * @param {number} n 第n个月
 * @param {number} b 贷款年利率
 */
export function interestByMonth(a, I, n, b) {
  const i = I / 12;
  return (a * i - b) * (1 + i) ** (n - 1) + b;
}

/**
 * 到第N个月应还的利息总和
 * @param {number} a 贷款总额
 * @param {number} I 贷款年利率
 * @param {number} n 第n个月
 * @param {number} b 贷款年利率
 */
export function totalInterestByMonth(a, I, n, b) {
  const i = I / 12;
  return (a * i - b) * ((1 + i) ** n - 1) / i + n * b;
}

