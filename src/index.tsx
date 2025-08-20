import { EmailTemplate } from './emails/email-template';
import { render } from '@react-email/render';

export default {
  async fetch(): Promise<Response> {
    const html = await render(<EmailTemplate firstName="John" />);
    console.log(html);

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
      status: 200,
    });
  },
};
