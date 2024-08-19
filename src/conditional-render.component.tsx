export const ConditionalRender = ({ when, children }: React.PropsWithChildren<ConditionalRenderProps>) => {
  return when ? <>{children}</> : null;
};

type ConditionalRenderProps = {
  when?: boolean;
};
