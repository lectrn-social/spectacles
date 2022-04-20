<script>
	export let path, privacy;
    import { authState } from '../auth.js';
    import { onDestroy, onMount } from 'svelte';

    let auth;
    onDestroy(authState.subscribe(x => auth = x));

    async function fetchFeed() {
        let lastItem = feed[feed.length - 1];

        let req = await fetch(process.env.SPECTACLES_BOOKSHELF_URL + path + "?" + new URLSearchParams({
            count: 20,
            before: Math.floor(new Date(lastItem ? lastItem.createdAt : Date.now()).valueOf() / 1000),
            privacy,
        }).toString(), {
            headers: {
                "Authorization": "Bearer " + auth.access_token
            }
        });

        let res = await req.json();
        if (res.error) return console.error(res);

        feed = [
            ...feed,
            ...res.items
        ];
    }

    let feed = [];

    onMount(fetchFeed);
</script>

<style>
    .feed {
        background-color: white;
        width: 33%;
        padding-left: 1em;
        padding-right: 1em;
    }

    .item:not(:last-child) {
        border-bottom: solid rgba(0, 0, 0, 25%) 1px;
    }

    .item a {
        color: black;
    }
</style>

<div class="feed">
    {#each feed as item}
        <div class="item">
            <p>
                <a href="/@/{item.owner.username}">
                    <b>{item.owner.name || item.owner.username}</b>
                    (@{item.owner.username})
                    {#if item.owner.pronouns.length > 0}
                        <i>{item.owner.pronouns[0].subject}/{item.owner.pronouns[0].object}</i>
                    {/if}
                </a>
            </p>
            <p>{item.content}</p>
        </div>
    {/each}
</div>