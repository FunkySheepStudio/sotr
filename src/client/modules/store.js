const { reactive } = Vue

const store = reactive(
    {
        async StartNetworkClient()
        {
            this.colyseus = new Colyseus.Client("ws://localhost:2567")
            this.room = await this.colyseus.joinOrCreate("game_room");
        }
    }
)

store.StartNetworkClient()