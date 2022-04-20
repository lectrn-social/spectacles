<script>
    import { navigate } from 'svelte-navigator';
    import { authState } from '../auth';

    (async function() {
        let params = new URLSearchParams(window.location.search);
        let code = params.get('code');

        if (!code) return;

        let req = await fetch(process.env.SPECTACLES_BOOKSHELF_URL + "/auth/token", {
            method: "POST",
            body: JSON.stringify({
                grant_type: "authorization_code",
                client_id: process.env.SPECTACLES_CLIENT_ID,
                redirect_uri: "http://localhost:8080/callback",
                code
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        let res = await req.json();

        if (res.error) {
            console.error(res);
            authState.set(undefined);
        } else {
            authState.set(res);
        }
    })().finally(() => navigate('/'));
</script>