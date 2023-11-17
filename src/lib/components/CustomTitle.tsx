import { Fragment } from 'react';

export const CustomTitle = (props: { label: ReactNode }) => {
  return (
    <Fragment>
      <div className="flex justify-between bg-[#F7F7F7] p-6 mb-10">
        <div className="text-theme text-base">{props.label}</div>
      </div>
    </Fragment>
  );
};
