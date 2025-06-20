import config from "@colyseus/tools";
import { monitor } from "@colyseus/monitor";
import { playground } from "@colyseus/playground";
import express from "express";
import path from "path";
/**
 * Import your Room files
 */
import { GameRoom } from "./rooms/Game_Room";

export default config({

    initializeGameServer: (gameServer) => {
        /**
         * Define your room handlers:
         */
        /*gameServer.define("lobby", LobbyRoom)
        .enableRealtimeListing();*/

        gameServer.define('game_room', GameRoom);

    },

    initializeExpress: (app) => {
        /**
         * Use @colyseus/playground
         * (It is not recommended to expose this route in a production environment)
         */
        if (process.env.NODE_ENV !== "production") {
            app.use("/admin/playground", playground());
        }

        /**
         * Use @colyseus/monitor
         * It is recommended to protect this route with a password
         * Read more: https://docs.colyseus.io/tools/monitor/#restrict-access-to-the-panel-using-a-password
         */
        app.use("/admin/monitor", monitor());
        
        /**
         * Bind your custom express routes here:
         * Read more: https://expressjs.com/en/starter/basic-routing.html
         */
        app.use(express.static(path.join(__dirname, '../client/game')))
        app.get(/(.*)/, (req, res) => {
            res.sendFile(path.join(__dirname, '../client/game/index.html'));
        })
    },


    beforeListen: () => {
        /**
         * Before before gameServer.listen() is called.
         */
    }
});
