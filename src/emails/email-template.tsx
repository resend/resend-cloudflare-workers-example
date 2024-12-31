import { FC } from 'react';

interface EmailTemplateProps {
	firstName: string;
}

export const EmailTemplate: FC<Readonly<EmailTemplateProps>> = ({ firstName }) => (
	<div>
		<h1>Welcome, {firstName}!</h1>
	</div>
);

export default EmailTemplate;
