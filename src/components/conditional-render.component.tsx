export const ConditionalRender = ({ when, otherwise, children }: React.PropsWithChildren<ConditionalRenderProps>) => {
  return when ? children : otherwise;
};

type ConditionalRenderProps = {
  when?: boolean;
  otherwise?: React.ReactNode;
};
