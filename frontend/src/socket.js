import  io  from 'socket.io-client';

// // "undefined" means the URL will be computed from the `window.location` object
// // const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4000';

export const socket = io(`http://35.160.218.222/`, {
    transports: ["websocket"],
            query: "appName=Terminal&AppId=7002738&AppSecret=cI790Mf&dispatch=true",
            autoConnect: false,
          });

