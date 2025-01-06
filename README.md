# Vite+Express Example Prototype

This is a trivial client-server application created to demonstrate how such a
setup looks using ExpressJS for the server and Vite for the frontend.

![screenshot](/assets/screenshot.png)

The server exposes a `/color` endpoint that generates a random color. This
endpoint optionally accepts a `variant` parameter that constains the color
space. The color is returned as a JSON object with `red`, `green`, and `blue`
integer values. The client invokes the server-side endpoint on load and when the
user clicks the `Change Color` button.

This is done using the [Vite-Express](https://github.com/szymmis/vite-express)
module. See that project's
[README](https://github.com/szymmis/vite-express/blob/master/README.md#-how-does-it-work)
for a description of how this works under the hood.

The project containerized with Docker. To run the docker container:

```sh
docker build .
docker run -p 3000:3000 <container-id>
```
