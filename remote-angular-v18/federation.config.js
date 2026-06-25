const { withNativeFederation } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
  name: 'notifications',

  exposes: {
    './mount': './src/mount.ts',
  },

  // Angular 18 is intentionally NOT shared — it's incompatible with the shell's
  // Angular 21. This remote ships its own Angular runtime, trading ~130kB of extra
  // bundle size for full version independence. This is the key trade-off NF exposes.
  shared: {},

  features: {
    ignoreUnusedDeps: true,
  },
});
