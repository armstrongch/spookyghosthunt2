var battle =
{
	monster: null,
	setup: function()
	{
		this.monster = new_random_monster();
		this.draw_monster_on_canvas();
		$('#statusP').text("A " + this.monster.type + " appears! What will you do?");
		$('#monsterStatusP').text(
			this.monster.type.charAt(0).toUpperCase() + this.monster.type.slice(1) //capitalize first letter of monster's name
			+ " health: " + this.monster.health + " / " + this.monster.max_health);
	},
	draw_monster_on_canvas: function()
	{
		//from: https://stackoverflow.com/questions/1393056/html-canvas-draw-image-without-anti-aliasing
		var canvas = $('#monsterCanvas')[0];
		var ctx = canvas.getContext('2d');
		ctx.fillStyle = resources.colors.white;
		ctx.fillRect(0, 0, 150, 150);
		ctx.drawImage(this.monster.monster_image, 15, 15,);
	}
};