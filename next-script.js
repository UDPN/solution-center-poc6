/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/no-var-requires */
const FS = require('fs');
require('dotenv').config({ path: './.env' });
require('dotenv').config({ path: './.env.production' });
const data = FS.readFileSync('./standalone/server.js');
let serverData = data.toString();
serverData = serverData.replace(
  "process.env.NODE_ENV = 'production'",
  `process.env.NODE_ENV = 'production';
const FS = require("fs");
require("dotenv").config({ path: "./.env" });
require("dotenv").config({ path: "./.env.production" });
const required_server_files = require("./.next/required-server-files.json");
const routes_manifest = require("./.next/routes-manifest.json");
const destination = process.env.NEXT_SERVICE_SERVER_URL + "/:path*";
global.NEXT_SERVICE_SERVER_URL = process.env.NEXT_SERVICE_SERVER_URL;

required_server_files &&
  required_server_files.config &&
  required_server_files.config._originalRewrites &&
  required_server_files.config._originalRewrites.afterFiles &&
  required_server_files.config._originalRewrites.afterFiles.forEach(
    (element, index) => {
      if (element.source == process.env.NEXT_PUBLIC_AGENT_ID + "/:path*") {
        required_server_files.config._originalRewrites.afterFiles[
          index
        ].destination = destination;
      }
    }
  );

routes_manifest &&
  routes_manifest.rewrites &&
  routes_manifest.rewrites.forEach((element, index) => {
    if (
      element.source.indexOf(process.env.NEXT_PUBLIC_AGENT_ID + "/:path*") > 0
    ) {
      routes_manifest.rewrites[index].destination = destination;
    }
  });

FS.writeFileSync(
  "./.next/required-server-files.json",
  JSON.stringify(required_server_files, undefined, "  ")
);

FS.writeFileSync(
  "./.next/routes-manifest.json",
  JSON.stringify(routes_manifest, undefined, "  ")
);
`
);
serverData = serverData.replace(
  `"${process.env.NEXT_SERVICE_SERVER_URL}/:path*"`,
  'global.NEXT_SERVICE_SERVER_URL + "/:path*"'
);

FS.writeFileSync('./standalone/server.js', serverData);
