import { env } from '$env/dynamic/private';
import { fail, redirect } from '@sveltejs/kit';
import { createItem, listItems, removeItem, updateItem } from '$lib/server/db';

function normalizeTitle(value: FormDataEntryValue | null): string {
	return typeof value === 'string' ? value.trim() : '';
}

function normalizeId(value: FormDataEntryValue | null): number | null {
	if (typeof value !== 'string') {
		return null;
	}

	const parsed = Number.parseInt(value, 10);

	return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

export const load = () => {
	return {
		items: listItems(),
		testenv: env.testenv ?? ''
	};
};

export const actions = {
	create: async ({ request }) => {
		const formData = await request.formData();
		const title = normalizeTitle(formData.get('title'));

		if (!title) {
			return fail(400, {
				message: 'Informe um título.',
				values: { title }
			});
		}

		createItem(title);
		throw redirect(303, '/');
	},
	update: async ({ request }) => {
		const formData = await request.formData();
		const id = normalizeId(formData.get('id'));
		const title = normalizeTitle(formData.get('title'));

		if (!id || !title) {
			return fail(400, {
				message: 'Informe um título válido para atualizar.',
				values: { title }
			});
		}

		updateItem(id, title);
		throw redirect(303, '/');
	},
	delete: async ({ request }) => {
		const formData = await request.formData();
		const id = normalizeId(formData.get('id'));

		if (!id) {
			return fail(400, {
				message: 'Selecione um item válido para excluir.'
			});
		}

		removeItem(id);
		throw redirect(303, '/');
	}
};