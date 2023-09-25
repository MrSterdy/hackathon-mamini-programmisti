import adapter from "svelte-adapter-bun";
import { vitePreprocess } from "@sveltejs/kit/vite";

const config = {
    preprocess: vitePreprocess(),

    kit: {
        adapter: adapter(),
        csrf: {
            checkOrigin: false
        }
    }
};

export default config;
