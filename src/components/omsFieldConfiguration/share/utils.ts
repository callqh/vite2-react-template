import { IConfig } from '../interface';

/**
 * 默认格式化文案规则
 * @param curFieldInfo 当前config中的表单配置项
 * @param textList 最终需要展示的文字列表
 * @param item value中的当前项
 */
const defaultFormat = (curFieldInfo, textList, item) => {
  // 找到所有的字段的属性 fields下面的
  const allFieldsProps = curFieldInfo?.fields?.map((field) => field);

  allFieldsProps?.forEach((field) => {
    // 表单中对应字段的属性值
    const val = item?.[field?.value];
    if (!val) return;
    // 如果是Select下拉框，则找到对应的options
    const options = field?.options;
    // const formatFunc = field?.
    if (options && options?.length > 0) {
      const curOption = options?.find((option) => option.value === val);
      const label = curOption?.label;
      textList.push(label);
    } else {
      textList.push(val);
    }
  });
};

/**
 * 格式化最终的文案显示
 * @param config 表单配置
 * @param value 表单值
 * @returns 需要显示的文案
 */
export const formatText = (config: IConfig, value) => {
  const type = config?.types?.value;
  let textList = [];
  value?.map((item) => {
    const fieldValue = item[type];
    // 找到当前字段对应的表单信息
    const curFieldInfo = config?.props?.find((prop) => prop?.value === fieldValue);
    // 如果存在用户自定义的格式化方法，则将信息交给用户自己处理
    if (curFieldInfo?.formatFunc) {
      const customFormatText = curFieldInfo?.formatFunc(item);
      textList.push(customFormatText);
    } else {
      // 默认格式化规则
      defaultFormat(curFieldInfo, textList, item);
    }
  });
  return textList?.join(' ');
};
