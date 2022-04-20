<script>
	import { Router, Route } from "svelte-navigator";
	import Navbar from "./components/Navbar.svelte";
	import Promo from "./routes/Promo.svelte";
	import Home from "./routes/Home.svelte";
	import Callback from "./routes/Callback.svelte";
	import User from "./routes/User.svelte";
</script>

<Router>
	<Navbar />
	<div style="width: 100%; height: calc(100% - 5em); box-sizing: border-box; padding-left: 8px; padding-right: 8px;">
		<Route path="/"><Promo /></Route>
		<Route path="/@/:username" let:params><User username={params.username} /></Route>
		<Route path="/home"><Home /></Route>
		<Route path="/callback"><Callback /></Route>
	</div>
</Router>