# Websocket

Websocket is another TCP based protocol similar to HTTP but with some differences.
- HTTP is call and response
- Websocket is 2 way message passing
- Client must initiate the connection in both cases
- In websocket, connection remains open and server can send client messages
- Websocket is event driven, handle callbacks to 4 main events, `open`, `close`, `message`, `error`
- Most of the logic back and forth can be done in the message handler, where any arbitrary data can be sent
- Add your own tags to handle different message types, similar to how redux uses them

## lab todos
- Finish the active user counter
- Finish live note taking 
