import { Button, Form, Input, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { IProps } from '../../interface';

interface IFormProps extends IProps {
  initValues: any;
  setInitValues: (newVal: any) => void;
}

const FormComponent: React.FC<IFormProps> = React.memo(
  ({ initValues, config, readonly, setInitValues, onChange, _registerValidator }) => {
    // 动态表单项的信息
    const [formItemMap, setFormItemMap] = useState<any>({});
    // 表单列表
    const [formList, setFormList] = useState<any>([]);
    // 保存所有表单的信息，用来处理验证和整合表单数据
    const [formsInfo, setFormsInfo] = useState<any>();

    // 编辑反显表单
    // !Tips: 这里的逻辑仅用来处理编辑反显
    useEffect(() => {
      if (formList?.length > 0) return;
      console.log('编辑反显数据处理ing');
      const tmpList = initValues?.map(() => uuidv4());
      // 存放表单对应的数据
      const customFormsInfo: any = {};
      // 遍历初始数据，来生成对应的动态表单，并且填充表单对应的数据
      initValues?.forEach((item: any, index: any) => {
        const formName = tmpList[index];
        generatorFormItem({ value: item?.[config?.types?.value!] }, formName, item);
        customFormsInfo[formName] = item;
      });
      setFormList([...tmpList]);
      setFormsInfo({ ...customFormsInfo });
    }, [initValues]);

    /**
     * 添加字段，生成新的表单
     */
    const addForm = () => {
      formList.push(uuidv4()); // 生成唯一值
      setFormList([...formList]);
    };

    /**
     * 根据选中的类型生成不同类型的表单项
     * @param options 选中的类型
     * @param name 表单的唯一name
     */
    const generatorFormItem = (
      options: any,
      name: string | number,
      initValueInfo: any = {},
    ) => {
      let formItemElem = null;
      const tmp: any = {};
      const { value } = options;
      // 配置中的表单属性
      const { props } = config;
      // 找出配置中对应的表单信息
      const curInfo = props?.find((item) => item?.value === value);

      if (curInfo) {
        formItemElem = curInfo?.fields?.map((field) => {
          return (
            <Form.Item
              key={field?.value}
              initialValue={initValueInfo?.[field?.value]}
              name={[name, field?.value]}
              label={field?.label}
              className="form-item"
              rules={field?.rules}
            >
              {field?.type === 'select' ? (
                <Select
                  disabled={readonly}
                  options={field?.options}
                  placeholder="请选择"
                  {...field?.otherProps}
                />
              ) : (
                <Input disabled={readonly} placeholder="请输入" {...field?.otherProps} />
              )}
            </Form.Item>
          );
        });
      }

      tmp[name] = formItemElem;
      setFormItemMap((prevItemMap: any) => ({ ...prevItemMap, ...tmp }));
    };

    // 渲染新增按钮
    const renderButton = () => {
      const defaultButton = (
        //  icon={span}
        <Button className="add-button" type="dashed" onClick={addForm} block>
          添加段数
        </Button>
      );
      // 没有设置最大长度，始终渲染按钮
      if (!config?.maxLength) return defaultButton;
      // 设置最大长度，小于最大长度时渲染
      if (formList?.length < config?.maxLength) return defaultButton;

      return null;
    };

    // 整合表单信息
    useEffect(() => {
      if (!formsInfo) return;
      const curForm = formsInfo;
      const formName = Object.keys(curForm);
      // 遍历数据整合到一个数组中
      const formData = formName?.map((name, index) => {
        // 这里是为了兼容编辑反显的时候我们手动生成的表单信息，就是单纯的 k-v结构,直接利用属性名取值即可
        const data = curForm[name]?.getFieldsValue
          ? curForm[name]?.getFieldsValue()?.[name]
          : curForm[name];
        return { ...data, id: initValues?.[index]?.id };
      });
      console.log(
        '%c 🍰 formData:',
        'font-size:22px;background-color:rgb(93, 61, 33);color:#fff;',
        formData,
      );

      // TODO 验证
      _registerValidator?.((callback: (_: any) => void) => {
        callback?.(undefined);
      }, {});

      // 触发onChange
      onChange?.(formData);
    }, [formsInfo, initValues]);

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Form.Provider
          onFormChange={(name, info) => {
            setFormsInfo(info?.forms);
          }}
        >
          {formList?.map((name: string, index: number) => (
            <Form layout="vertical" name={name} key={name} style={{ marginBottom: 17 }}>
              <Form.Item className="form-item-wrapper">
                <p style={{ width: '100%' }}>
                  {'段数'}
                  {index + 1}
                </p>
                <Form.Item
                  name={[name, config?.types?.value || 'types']}
                  label={config?.types?.label || '类型'}
                  className="form-item"
                  initialValue={initValues?.[index]?.[config?.types?.value!]}
                  rules={[
                    {
                      required: true,
                      message: `${config?.types?.label || '类型'}${'不能为空'}`,
                    },
                  ]}
                >
                  <Select
                    disabled={readonly}
                    placeholder={'请选择'}
                    onChange={(val, option) => generatorFormItem(option, name)}
                    options={config?.props}
                  />
                </Form.Item>
                {/* 动态渲染表单项 */}
                {formItemMap[name]}
                {/* 删除 */}
                {readonly ? null : (
                  <span
                    // type="delete"
                    onClick={() => {
                      const res = formList?.filter((item: any) => item !== name);
                      delete formItemMap[name];
                      delete formsInfo[name];
                      // 删除初始值，防止新增的时候依旧命中初始值的问题
                      if (initValues?.[index]) {
                        const tmp = initValues?.filter(
                          (_: any, i: number) => i !== index,
                        );
                        setInitValues([...tmp]);
                      }
                      // 更新表单
                      setFormsInfo({ ...formsInfo });
                      setFormItemMap({ ...formItemMap });
                      setFormList([...res]);
                    }}
                    className="delete-button"
                  />
                )}
              </Form.Item>
            </Form>
          ))}
        </Form.Provider>

        {readonly ? null : renderButton()}
      </div>
    );
  },
);

export default FormComponent;
