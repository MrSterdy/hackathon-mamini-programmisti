/** @type {import('tailwindcss').Config} */
export default {
    mode: "jit",
    content: ["./src/**/*.{html,js,svelte,ts}"],
    theme: {
        extend: {
            fontFamily: {
                doloman: ["DolomanPavljenko", "sans-serif"],
                mariupol: ["Mariupol", "sans-serif"]
            }
        }
    },
    plugins: [require("@tailwindcss/forms")]
};
