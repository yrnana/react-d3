export type PathProps = React.SVGProps<SVGPathElement>;

export const Path = (props: PathProps) => {
  return <path {...props} />;
};
