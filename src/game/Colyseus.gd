extends Node
var colyseus_interface = JavaScriptBridge.get_interface("Colyseus")
var colyseus_client: JavaScriptObject = null
var colyseus_room: JavaScriptObject = null
var colyseus_address: String = "ws://localhost:2567"

func _ready():
	JavaScriptBridge.eval("window.colyseus_client = new Colyseus.Client('" + colyseus_address + "');", true)
	colyseus_client = JavaScriptBridge.get_interface("colyseus_client")
	colyseus_client.joinOrCreate("game_room")
	
