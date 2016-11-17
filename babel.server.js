require("babel-polyfill");

/**
 * Configure babel using the require hook
 * More details here: https://babeljs.io/docs/setup/#babel_register
 */
let babelProps = {
    only: /src/,
    presets: ["es2015", "react", "stage-0"]
};

if (process.env.NODE_ENV !== "production") {
    babelProps.plugins = ["react-hot-loader/babel"];
}

require("babel-core/register")(babelProps);
/**
 * Define isomorphic constants.
 */
global.__CLIENT__ = false;
global.__SERVER__ = true;

if (process.env.NODE_ENV !== "production") {
    if (!require("piping")({hook: true, includeModules: false})) {
        return;
    }
}

try {
    require("./src/server/server");
}
catch (error) {
    console.error(error.stack);
}
