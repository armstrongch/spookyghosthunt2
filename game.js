var game = 
{
	game_state: "setup",
	
	setup: function() {
		resources.load();
		this.set_state("shop");
	},
	
	set_state: function(state) {
		this.game_state = state;
		
		$('#battleDiv').css('display', state == "battle" ? 'block' : 'none');
		$('#shopDiv').css('display', state == "shop" ? 'block' : 'none');
		$('#victoryDiv').css('display', state == "victory" ? 'block' : 'none');
		
		switch(state)
		{
			case "shop":
				shop.setup();
				break;
			case "battle":
				battle.setup();
				break;
			case "victory":
				victory.setup();
				break;
			default:
				break;
		}
	}
};