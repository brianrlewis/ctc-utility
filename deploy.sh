#!/usr/bin/env bash

quasar build
mkdir dist/spa/.vercel
cp .vercel/project.json dist/spa/.vercel/project.json
vercel --prod
