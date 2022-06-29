import { IConfig } from '../interface';

const defaultConfig: IConfig = {
  title: '企业码预览',
  maxLength: 3,
  types: {
    label: '类型',
    value: 'enterpriseCodeRuleTypeDict',
  },
  // 类型字段
  props: [
    {
      label: '字段',
      value: 'FIELD',
      fields: [
        {
          type: 'select',
          label: '字段',
          value: 'productType',
          rules: [{ required: true, message: '字段不能为空' }],
          logicFunc: 'aaaaa',
          options: [
            {
              value: 'PRODUCT',
              label: '货品编码',
            },
            {
              value: 'ITEM',
              label: '款式编码',
            },
          ],
        },
      ],
    },
    {
      label: '日期',
      value: 'TIME',
      fields: [
        {
          type: 'select',
          label: '日期格式',
          value: 'dateFormat',
          options: [
            {
              label: 'yyyyMMdd',
              value: 'yyyyMMdd',
            },
          ],
          rules: [{ required: true, message: '日期格式不能为空' }],
        },
      ],
    },
    {
      label: '序列号',
      value: 'SERIALNUMBER',
      formatFunc: (obj): string => {
        const start = String(obj?.serialNumberFrom)?.split('') || [];
        const length = obj?.serialNumberLength;
        if (length && start?.length) {
          if (length < start?.length) {
            return;
          }
          let result = new Array(length - start?.length).fill(0);
          result = result.concat(start);
          return result?.join('');
        }
        return undefined;
      },
      fields: [
        {
          type: 'input',
          label: '起始值',
          value: 'serialNumberFrom',
          rules: [{ required: true, message: '起始值不能为空' }],
        },
        {
          type: 'input',
          label: '长度',
          value: 'serialNumberLength',
          rules: [{ required: true, message: '长度不能为空' }],
          otherProps: {
            type: 'number',
          },
        },
      ],
    },
  ],
  transformServiceData: (setInitValue, value) => {
    if (value?.length <= 0) return;
    const tmp = value?.map((item: any) => {
      return {
        enterpriseCodeRuleTypeDict: item?.ruleType,
        ...item?.enterpriseCodeEntryRuleAttribute,
        id: item?.id,
      };
    });
    setInitValue([...tmp]);
  },
};

export default defaultConfig;
