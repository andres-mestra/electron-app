module.exports = {
  packagerConfig: {
    dir: './.webpack',
    asar: true,
    ignore: [
      '.gitignore',
      '.npmrc',
      '.env-cmdrc',
      '.env.development',
      '.env.test',
      '.env.production',
      '.env.example',
      'jest-setup.ts',
      'jest.config.ts',
      'codecept.conf.js',
      'README.md',
      'node_modules',
      'specs',
      'view',
      'main',
      'mock',
      'template',
    ],
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    // {
    //   name: '@electron-forge/maker-rpm',
    //   config: {},
    // },
  ],
  plugins: [['@electron-forge/plugin-auto-unpack-natives']],
}
