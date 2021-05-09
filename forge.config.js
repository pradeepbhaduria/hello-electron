module.exports = {
  makers: [
    {
      name: "@electron-forge/maker-zip",
      platforms: ["linux"],
      config: {
        // Config here
      },
    },
    {
      name: "@electron-forge/maker-dmg",
      config: {
        //   background: './assets/dmg-background.png',
        //   format: 'ULFO'
      },
    },
  ],
};
