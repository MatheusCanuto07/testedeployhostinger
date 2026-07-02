<script lang="ts">
	import type { ActionData, PageData } from './$types';

	let { data, form } = $props<{ data: PageData; form: ActionData }>();
</script>

<svelte:head>
	<title>CRUD SQLite</title>
</svelte:head>

<h1>CRUD com 1 campo</h1>

<p>TESTENV: {data.testenv}</p>

{#if form?.message}
	<p>{form.message}</p>
{/if}

<h2>Criar item</h2>

<form method="POST" action="?/create">
	<label for="title">Título</label>
	<input id="title" name="title" value={form?.values?.title ?? ''} />
	<button type="submit">Salvar</button>
</form>

<h2>Itens</h2>

{#if data.items.length === 0}
	<p>Nenhum item cadastrado.</p>
{:else}
	<ul>
		{#each data.items as item}
			<li>
				<form method="POST" action="?/update">
					<input type="hidden" name="id" value={item.id} />
					<label for={`title-${item.id}`}>Título</label>
					<input id={`title-${item.id}`} name="title" value={item.title} />
					<button type="submit">Atualizar</button>
				</form>

				<form method="POST" action="?/delete">
					<input type="hidden" name="id" value={item.id} />
					<button type="submit">Excluir</button>
				</form>
			</li>
		{/each}
	</ul>
{/if}
