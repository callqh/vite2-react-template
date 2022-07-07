import '../style.less';

import React, { useEffect, useMemo, useState } from 'react';

import { IProps } from '../interface';
import defaultConfig from '../share/config';
import { formatText } from '../share/utils';
import Form from './form/form';

const Component: React.FC<IProps> = (props) => {
  const {
    config = defaultConfig,
    value,
    onChange,
    _registerValidator: registerValidator,
    readonly,
  } = props;
  const [defaultData, setDefaultData] = useState([]);
  const [defaultValue, setDefaultValue] = useState(value);

  useEffect(() => {
    if (!value || defaultData.length > 0) return;
    config?.transformServiceData?.(setDefaultData, value);
  }, [value]);

  /**
   * 需要显示的字段文字
   */
  const text = useMemo(
    () => (!formatText(config, defaultValue) ? '-' : formatText(config, defaultValue)),
    [config, defaultValue],
  );

  const handleChange = (value: any) => {
    setDefaultValue(value);
    onChange?.(value);
  };

  return (
    <div className="field-configuration-wrapper">
      {/* 字段文案预览 */}
      <div className="field-info-wrapper">
        <p className="field-title">{config?.title}</p>
        <p className="field-text"> {text} </p>
      </div>
      {/* 动态增减的表单 */}
      <div className="form-wrapper">
        <Form
          initValues={defaultData}
          setInitValues={setDefaultData}
          onChange={handleChange}
          config={config}
          readonly={readonly}
          _registerValidator={registerValidator}
        />
      </div>
    </div>
  );
};

export default Component;
