import { withNativeFederation, shareAll } from '@softarc/native-federation/config';

export default withNativeFederation({
  name: 'remote-projects',

  exposes: {
    './mount': './src/mount.tsx',
  },

  shared: {},
});
