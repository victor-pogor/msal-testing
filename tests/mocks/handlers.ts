import { HttpResponse, http } from 'msw';

export const handlers = [
  http.get('https://sample-api/posts', () => {
    return HttpResponse.json({ status: 'success' }, { status: 200 });
  }),
];
