export type BarProps = React.SVGProps<SVGRectElement>;

export const Bar = (props: BarProps) => {
  return <rect {...props} />;
};
