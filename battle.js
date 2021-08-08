var battle =
{
	monster: null,
	setup: function()
	{
		this.monster = new_random_monster();
		this.draw_monster_on_canvas();
		$('#statusP').text("A " + this.monster.type + " appears! What will you do?");
		this.begin_round();	
	},
	begin_round: function()
	{
		//show monster health
		$('#monsterStatusP').text(
			this.monster.type.charAt(0).toUpperCase() + this.monster.type.slice(1) //capitalize first letter of monster's name
			+ " health: " + this.monster.health + " / " + this.monster.max_health);
		
		if (this.monster.undead)
		{
			$('#monsterStatusP').text($('#monsterStatusP').text() + " (undead)");
		}
		
		for (let i = 0; i < player.items.length; i += 1)
		{
			var move_row = `<tr data-value=player.items[${i}]><td>${player.items[i].name}</td><td>${player.items[i].desc}</td>` + 
				`<td><input type="checkbox"></td></tr>`;
			$("#battleTable").find('tbody').append(move_row);
		}
		if (player.items.length == 0)
		{
			var move_row = `<tr><td>(You don't have any items. Tough luck, pal.)</td><td></td>` + 
				`<td><input type="checkbox" disabled="true"></td></tr>`;
			$("#battleTable").find('tbody').append(move_row);
		}
		
		var submission_row = '<tr><td colspan=\'2\'></td><td><button id=\'submitButton\'>Submit</button></td></tr>';
		$("#battleTable").find('tbody').append(submission_row);
		
		$('#playerStatusP').text(
			"Your health: " + player.health + " / " + player.max_health);
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