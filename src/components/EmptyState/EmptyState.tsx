const EmptyState = ({
  icons,
  title,
  subTitle,
  btn,
}: {
  btn?: any;
  icons?: any;
  title: string;
  subTitle: string;
}) => {
  return (
    <div className='emptyStateContainer flex-col min-h-[40vh] text-center my-2'>
      {icons && (
        <figure className='w-4/12 mx-auto mb-3'>
          <img className='w-full' src={icons} alt='' />
        </figure>
      )}
      <h4 className='mb-2'>{title} </h4>
      <p className='!text-black'>{subTitle} </p>
      {btn && (
        <div className='flex justify-center items-center my-5'>{btn}</div>
      )}
    </div>
  );
};

export default EmptyState;
