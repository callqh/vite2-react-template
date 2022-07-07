import { Spin } from 'antd';
import { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';

import routes from '~react-pages';

console.log(
  '%c 🍒 routes:',
  'font-size:22px;background-color:rgb(128, 118, 163);color:#fff;',
  routes,
);

const App = () => {
  return (
    <div
      style={{ padding: 30, width: '100%' }}
      data-tip="你的组件在下面调试，这是个外层容器"
    >
      <Suspense
        fallback={<Spin tip="组件疯狂加载中！" style={{ margin: '30px auto' }}></Spin>}
      >
        {useRoutes(routes)}
      </Suspense>
    </div>
  );
};

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root'),
);
