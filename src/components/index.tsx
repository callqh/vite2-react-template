import { Avatar, Card, Skeleton } from 'antd';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import routes from '~react-pages';

const { Meta } = Card;

export default () => {
  // 需要渲染的组件列表
  const componentList = useMemo(
    () =>
      routes?.map((item, index) => {
        const doc = item?.children?.find((child) => child.path == 'doc');
        if (doc) {
          console.log(
            '%c 💖 doc:',
            'font-size:22px;background-color:rgb(242, 62, 35);color:#fff;',
            doc,
          );
        }

        if (item?.path !== '/') {
          return (
            <Card style={{ width: 300, marginTop: 16, marginRight: 16 }} key={item?.path}>
              <Skeleton loading={routes?.length <= 0}>
                <Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title={<Link to={item?.path}>{item?.path}</Link>}
                  description="这是神马组件"
                />
                {/* <div dangerouslySetInnerHTML={{ __html: MDMD }}></div> */}
              </Skeleton>
            </Card>
          );
        }
      }),
    routes,
  );

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <div style={{ width: '100%', marginBottom: 20 }}>这是首页</div>
      {componentList}
    </div>
  );
};
