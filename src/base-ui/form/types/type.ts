/**
 * @description base_form组件 配置项类型
 * @author liujinliang
 */
import { RuleItem } from './rules'
//  表单元素组件类型
type formItemTypes =
  | 'input'
  | 'select'
  | 'option'
  | 'date-picker'
  | 'time-picker'
  | 'switch'
  | 'checkbox-group'
  | 'checkbox'
  | 'radio-group'
  | 'radio'
  | 'button'
  | 'slider'
  | 'upload'
  | 'transfer '

export interface formItemOptionsTypes {
  // 表单项组件类型
  formItemTypes: formItemTypes
  // 表单元素类型
  type?: string
  // 表单项的值
  value: any
  // 表单项的label
  label: string
  placeholder?: string
  // 表单项的标识
  prop: string
  // 表单项的其他属性
  attrs?: {
    disabled?: boolean
    clearable?: boolean
    showPassword?: boolean
  }
  // 表单项验证规则
  rules?: RuleItem[]
  // 表单项子项 select-->option这类
  childrens?: formItemOptionsTypes[]
}

//表单组件接口
export interface formOptionsTypes {
  // 表单的禁用属性
  disabled?: boolean
  // 表单的模式
  inline?: boolean
  labelWidth?: string
  // 表单项属性
  formItemOptions: formItemOptionsTypes[]
  // 是否需要验证表单项规则
  isRules?: boolean
}
