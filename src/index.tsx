import { Resend } from 'resend';
import { EmailTemplate } from './emails/email-template';

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const resend = new Resend('re_123456789'/* env.RESEND_API_KEY */);

		const data = await resend.emails.send({
			from: 'Acme <onboarding@resend.dev>',
			to: ['delivered@resend.dev'],
			subject: 'hello world',
			react: <EmailTemplate firstName="John" />,
		});

		return new Response(JSON.stringify(data), {
			headers: {
				'Content-Type': 'application/json',
			},
		});
	},
};
