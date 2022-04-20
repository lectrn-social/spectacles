<script>
	export let userid;
    import { authState } from '../auth.js';
    import { onDestroy, onMount } from 'svelte';

    let auth;
    onDestroy(authState.subscribe(x => auth = x));

    let user;

    async function fetchUser() {
        let req = await fetch(process.env.SPECTACLES_BOOKSHELF_URL + "/users/" + userid, {
            headers: {
                "Authorization": "Bearer " + auth.access_token
            }
        });

        let res = await req.json();
        if (res.error) return console.error(res);

        user = res;
    }

    onMount(fetchUser);
</script>

<style>
    .userbox {
        background-color: white;
        width: 15%;
        padding-left: 1em;
        padding-right: 1em;
    }
</style>

{#if user}
    <div class="userbox">
        <p><b>{user.name || user.username}</b> (@{user.username})</p>
        {#if user.pronouns.length > 0}
            <p><i>{user.pronouns[0].subject}/{user.pronouns[0].object}</i></p>
        {/if}
    </div>
{/if}