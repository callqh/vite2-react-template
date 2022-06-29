import { OmsFiledConfiguration } from './components';

const App = () => {
  return (
    <div>
      <div>
        <OmsFiledConfiguration value={[]} onChange={(val) => console.log(val)} />
      </div>
    </div>
  );
};

export default App;
