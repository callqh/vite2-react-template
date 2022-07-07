import { Rule } from 'antd/lib/form';

interface BaseTypes {
  label: string;
  value: string;
}

interface IFields extends BaseTypes {
  /** 表单类型 */
  type: 'select' | 'input';
  /** 当表单类型为select时才需要配置该选项，下拉框中的配置项 */
  options?: BaseTypes[];
  /** TODO: 请求参数，表单类型为select时可以调用该接口请求配置项(暂未实现) */
  logicFunc?: string;
  /** 规则配置 */
  rules?: Rule[];
  /** 其他配置，可以参考antd的Select和Input的API */
  otherProps?: { [key: string]: any };
}
interface IConfigProps extends BaseTypes {
  /** 表单配置项 */
  fields: IFields[];
  /** 用户自定义格式化该字段的展示文字 */
  formatFunc?: (obj) => string;
}

export interface IConfig {
  /** 标题 */
  title: string;
  /** 最多添加个数 */
  maxLength?: number;
  /** 第一个输入框的下拉框配置，下拉的options默认是遍历props中的所有字段 */
  types?: BaseTypes;
  /** 表单项的配置数组，所有表单项均通过该参数生成 */
  props: IConfigProps[];
  /**
   *  将后端返回的格式处理为符合组件的格式值，如下，里面的字段取决与props和fields中定义的value
   * @params setInitValue 设置初始值的函数
   * @params value 后端返回的value值
   *  [{name: xxx, age:xxx },{name:xxx,age:xxx}]
   */
  transformServiceData?: (setInitValue, value) => void;
}

export interface IProps {
  /** 表单值 */
  value?: [];
  /** 表单配置，用户不传则使用默认配置项 `./share/config.ts` */
  config?: IConfig;
  /** 只读模式 */
  readonly?: boolean;
  /** 字段改变触发的事件 */
  onChange?: (val?: any) => void;
  /** 触发验证，onChange和submit的时候会触发 */
  _registerValidator?: (callback, param) => void;
}
