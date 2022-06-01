export type LineProps = React.SVGProps<SVGPathElement>;

export const Line = (props: LineProps) => {
  return <path {...props} />;
};
