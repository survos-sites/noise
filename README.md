# SyNoise -- A Symfony Version of https://github.com/wes-goulet/background-noise

This application aims to replicate the Background Noise App using Symfony components.

It is mostly a testing environment and demostration of how to deploy a Symfony-based application as a PWA, using AssetMapper and tools like https://github.com/Spomky-Labs/phpwa


## Developer Installation

```bash
git clone git@github.com:survos-sites/noise.git && cd noise
composer install
symfony check:req
symfony server:start -d
symfony open:local
```

If working on the PWA bundle, install survos in the same directory as noise, and run

```bash
../survos/link .
```



## Migration

The key element of the migration is to generate the sw.js file from pwa.yaml instead of hand-crafting it. 

Also, the original app did not run offline, but certainly should.

The original sw.js was renamed to sw-original.js, but is only a reference.
