/** 手机号（数字）校验 */
export const phoneNumber = value => {
  if (typeof value === 'undefined' || value === null || value === '') {
    return true;
  }

  const regex = /^1[3|5|7|8]\d{9}$/;
  return regex.test(value);
};
