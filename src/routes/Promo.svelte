<script>
    import { navigate } from 'svelte-navigator';
    import { authState } from '../auth.js';
    import { onDestroy } from 'svelte';

    let checkAuth = val => {
        if (val) {
            navigate('/home', { replace: true })
        }
    }

    onDestroy(authState.subscribe(checkAuth));
</script>

<h1>promo</h1>