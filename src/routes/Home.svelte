<script>
    import Feed from '../components/Feed.svelte';
    import { navigate } from 'svelte-navigator';
    import { authState } from '../auth.js';
    import { onDestroy } from 'svelte';

    onDestroy(authState.subscribe(val => {
        if (!val) {
            navigate('/', { replace: true })
        }
    }));
</script>

<div style="width: 100%; box-sizing: border-box; margin-top: 1em; display: flex; justify-content: center;">
    <Feed path="/users/me/feeds/home" privacy="private" />
</div>