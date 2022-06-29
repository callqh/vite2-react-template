import { FC, Fragment, useState } from 'react';

export interface TextProps {
  title: string;
}

export const Text: FC<TextProps> = props => {
  const [state, setstate] = useState('');
  console.log(state);

  return (
    <Fragment>
      <div className="flex justify-center">
        <div className="font-bold text-black my-5">{props.title}</div>
      </div>
    </Fragment>
  );
};
