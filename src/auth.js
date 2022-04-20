import { writable } from "svelte/store";

let base = localStorage.getItem("auth");
try {
    base = JSON.parse(base)
} catch (e) {
    base = undefined;
}

export const authState = writable(base);

authState.subscribe(val => {
    localStorage.setItem("auth", JSON.stringify(val));
})