import cx from 'classnames';

export const Button = ({
  className,
  ...props
}: JSX.IntrinsicElements['button']) => {
  return (
    <button
      className={cx(
        'bg-violet-400 text-white p-2 rounded hover:bg-violet-500',
        className
      )}
      {...props}
    />
  );
};
