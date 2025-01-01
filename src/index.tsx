import { Resend } from 'resend';
import { Response, type Request, type ExecutionContext } from "@cloudflare/workers-types";

import { EmailTemplate } from './emails/email-template';

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		if (request.method !== "POST") {
			return new Response(null, { status: 403, statusText: 'Method not allowed' });
		}

		const formData = await request.formData();

		const name = formData.get('name');
		const email = formData.get('email');
		const subject = formData.get('subject');
		const message = formData.get('message');

		if (!name) {
			return new Response(null, { status: 403, statusText: 'Name must be provided' });
		} else if (!email) {
			return new Response(null, { status: 403, statusText: 'Email must be provided' });
		} else if (!subject) {
			return new Response(null, { status: 403, statusText: 'Subject must be provided' });
		} else if (!message) {
			return new Response(null, { status: 403, statusText: 'Message must be provided' });
		}

		const resend = new Resend(env.RESEND_API_KEY);

		const data = await resend.emails.send({
			from: `${name} <${email}>`,
			to: [env.RESEND_RECIPIENT],
			subject,
			react: <EmailTemplate firstName={name} />,
		});

		console.log({
			name,
			email,
			subject,
			message
		});

		return new Response(JSON.stringify(data), {
			headers: {
				'Content-Type': 'application/json',
			},
		});
	},
};
