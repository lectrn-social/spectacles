<script>
	import { Link } from "svelte-navigator";
    import { authState } from '../auth';
	import { onDestroy } from "svelte";

	let authed = false;
	onDestroy(authState.subscribe(val => authed = !!val));
</script>

<style>
    nav.navbar {
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-left: 1em;
        padding-right: 1em;
        width: 100%;
        height: 2.5em;
        background-color: white;
        box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
        gap: 1em;
    }

    nav.navbar button, nav.navbar button:active {
        background-color: transparent !important;
        outline: none;
        border: none;
        padding: 0;
        margin: 0;
        cursor: pointer;
        box-shadow: none !important;
    }

    nav.navbar > .rightnav {
        height: 100%;
        align-self: flex-end;
        width: 100%;
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
    }
</style>

<nav class="navbar">
    <Link style="color: black; text-decoration: none;" to="/"><b>Lectrn</b></Link>

    <div class="rightnav">
        {#if authed}
            <button on:click={() => authState.set(undefined)}>Sign Out</button>
        {:else}
            <a href={process.env.SPECTACLES_BOOKSHELF_URL + "/auth/authorize?" + new URLSearchParams({
                response_type: "code",
                client_id: process.env.SPECTACLES_CLIENT_ID,
                redirect_uri: "http://localhost:8080/callback",
                scope: "me me:write me:private blips:write feed:home feed:home:private others others:private account:admin offline_access"
            }).toString()}>Sign In or Sign Up</a>
        {/if}
    </div>
</nav>