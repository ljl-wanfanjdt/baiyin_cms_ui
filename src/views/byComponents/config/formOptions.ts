import { formOptionsTypes } from '@/base-ui/form/types/type'
const formOptions: formOptionsTypes = {
  formItemOptions: [
    {
      formItemTypes: 'input',
      value: '',
      label: '用户名',
      placeholder: '请输入用户名',
      prop: 'username',
      attrs: {
        clearable: true
      },
      rules: [
        {
          type: 'string',
          required: true,
          pattern: /^[a-zA-Z0-9\u4e00-\u9fa5_]+$/,
          message: '输入格式不正确',
          trigger: 'blur'
        }
      ]
    },
    {
      formItemTypes: 'select',
      value: '',
      label: '角色名',
      placeholder: '请选择角色类型',
      prop: 'rolename',
      attrs: {
        clearable: true
      },
      childrens: [
        {
          formItemTypes: 'option',
          value: 1,
          prop: 'role',
          label: '管理员'
        }
      ]
    },
    {
      formItemTypes: 'input',
      type: 'password',
      value: '',
      label: '密码',
      placeholder: '请输入密码',
      prop: 'password',
      attrs: {
        clearable: true,
        showPassword: true
      },
      rules: [
        {
          type: 'string',
          required: true,
          pattern: /^[\w]{3,15}$/,
          message: '输入格式不正确',
          trigger: 'blur'
        }
      ]
    }
  ],
  labelWidth: '100px',
  isRules: true
}

export default formOptions
