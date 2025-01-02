import type { Response, Request, ExecutionContext } from "@cloudflare/workers-types";
import { Resend } from 'resend';

import { EmailTemplate } from './emails/email-template';

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		if (request.method !== "POST") {
			return new Response(null, {
				status: 403
			});
		}

		const formData = await request.formData();

		const name = formData.get('name');
		const email = formData.get('email');
		const subject = formData.get('subject');
		const message = formData.get('message');

		if (!name) {
			return new Response('Name must be provided', {
				status: 403,
				headers: {
					'Content-type': 'text/plain'
				}
			});
		} else if (!email) {
			return new Response('Email must be provided', {
				status: 403,
				headers: {
					'Content-type': 'text/plain'
				}
			});
		} else if (!subject) {
			return new Response('Subject must be provided', {
				status: 403,
				headers: {
					'Content-type': 'text/plain'
				}
			});
		} else if (!message) {
			return new Response('Message must be provided', {
				status: 403,
				headers: {
					'Content-type': 'text/plain'
				}
			});
		}

		const req = {
			from: `${name} <${email}>`,
			to: [env.RESEND_RECIPIENT],
			subject,
		};

		console.log({
			stage: 'request',
			payload: req
		});

		const resend = new Resend(env.RESEND_API_KEY);

		const res = await resend.emails.send({
			...req,
			react: <EmailTemplate firstName={name} />,
		});

		console.log({
			stage: 'response',
			payload: res
		});

		if (res.error) {
			return new Response(JSON.stringify(res.error), {
				status: 500,
				headers: {
					'Content-Type': 'application/json',
				},
			});
		}

		return new Response(JSON.stringify(res.data), {
			headers: {
				'Content-Type': 'application/json',
			},
		});
	},
};
