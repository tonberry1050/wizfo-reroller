const { serialHooks } = require('electron-packager/src/hooks');
const {promises: fs} = require("fs");
const path = require('path');
const { createImportSpecifier } = require('typescript');

module.exports = {
  packagerConfig: {
    platform: ['win32'],
    arch: ['x64'],
    ignore: [
      /^\/src/,
      /^\/node_modules/,
      /^\/[^\/]*\.(?!json).*$/
    ],
    asar: true,
    extraResource: [
      "./readme.md",
      "./src/script",
    ],
  },
  makers: [
    {
      name: '@electron-forge/maker-zip'
    }
  ]
};