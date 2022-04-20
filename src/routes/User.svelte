<script>
    export let username;
    import Feed from '../components/Feed.svelte';
    import UserBox from '../components/UserBox.svelte';
</script>

<div style="width: 100%; box-sizing: border-box; margin-top: 1em; display: flex; justify-content: center; gap: 1em;">
    <UserBox userid="@{username}" />
    <Feed path="/users/@{username}/feeds/user" privacy="private" />
</div>