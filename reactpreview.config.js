const reactpreview = require("@reactpreview/config");

module.exports = reactpreview.config({
    /**
     * Configure custom aliases (auto-detected if you use TypeScript).
     alias: {
        foo: "src/foo"
    },
     */

    /**
     * Configure a public assets directory.
     */
    publicDir: "public",

    /**
     * Set up a custom component to wrap around previewed components.
     *
     * Useful to set up context providers and CSS dependencies.
     wrapper: {
        path: "__reactpreview__/Wrapper.tsx",
        componentName: "Wrapper"
    },
     */

    /**
     * Customise the exported React component name for SVG files.
     */
    svgr: {
        componentName: "default"
    }
});
