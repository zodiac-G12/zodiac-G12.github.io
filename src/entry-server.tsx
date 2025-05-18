// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <title>ZODIACのプロフィール</title>
          <meta charset="utf-8" />
          <meta
            name="description"
            content="ZODIAC's personal portfolio website. A full-stack engineer showcasing skills in web development, apps, and technical writing."
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          {assets}
        </head>
        <body>
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
