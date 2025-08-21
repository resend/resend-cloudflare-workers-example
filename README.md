# Resend with Cloudflare Workers

This example shows how to use Resend with [Cloudflare Workers](https://workers.cloudflare.com).

## Prerequisites

To get the most out of this guide, you’ll need to:

* [Create an API key](https://resend.com/api-keys)
* [Verify your domain](https://resend.com/domains)

## Instructions

### 1. Install

Get the Resend Node.js SDK.

```bash
npm install resend
```

### 2. Create an email template

Start by creating your email template on `src/emails/email-template.tsx`:

```tsx
import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
}) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
  </div>
);

export default EmailTemplate;
```

### 3. Send the email using React and the SDK

Change the file extension of the worker's main file to `tsx` and modify your configurations.

After that, you can send your email using the `react` parameter:

```tsx
import * as React from 'react';
import { Resend } from 'resend';
import { EmailTemplate } from './emails/email-template';

export default {
  async fetch(request, env, context): Promise<Response> {
    const resend = new Resend('re_123456789');

    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['delivered@resend.dev'],
      subject: 'hello world',
      react: <EmailTemplate firstName="John" />,
    });

    return Response.json(data);
  },
} satisfies ExportedHandler<Env, ExecutionContext>;
```

### 4. Deploy and send email

Run `wrangler deploy` and wait for it to finish. Once it's done, it will
give you a URL to try out, like `https://my-worker.your_name.workers.dev`,
that you can open and verify that your email has been sent.

## License

MIT License
