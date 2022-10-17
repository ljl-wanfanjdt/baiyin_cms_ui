export const rules = {
  userName: [
    {
      required: true,
      message: '用户名是必传内容~',
      trigger: 'blur'
    },
    {
      pattern: /^[a-zA-Z0-9\u4e00-\u9fa5_]{2,255}$/,
      message: '用户名必须是5~10个字母数字或-',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码是必传内容~',
      trigger: 'blur'
    },
    {
      pattern: /^[a-zA-Z0-9\u4e00-\u9fa5_]{3,255}$/,
      message: '用户名必须是3位以上的字母数字或-',
      trigger: 'blur'
    }
  ]
}
