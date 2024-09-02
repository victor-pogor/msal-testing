import { render } from '@testing-library/react';
import { MockAuthentication } from './mock-auth.component';

function customRender(ui: React.ReactElement, options: Parameters<typeof render>[1] = {}) {
  return render(ui, { wrapper: MockAuthentication, ...options });
}

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
export { customRender as render };
