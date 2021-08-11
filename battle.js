var battle =
{
	monster: null,
	setup: function()
	{
		this.monster = monster_factory.new_random_monster();
		$('#statusP').text("A " + this.monster.type + " appears! What will you do?");
		this.begin_round();
	},
	end_turn: function()
	{
		var new_status_text = "";
		
		var phases = ["player_turn_end", "monster_turn_end", "battle_end"];
		
		for (let p = 0; p < phases.length; p += 1)
		{
			var phase = phases[p];
			if (
				!((phase == "monster_turn_end") && (this.monster.health <= 0)) //don't give the monster an action if it's dead
				&& !((phase == "battle_end") && (this.monster.health > 0)) //only do the battle_end phase if the monster is dead
			) 
			{
				for (let i = 0; i < player.items.length; i += 1)
				{
					var tr = $('#battleTable tr')[i + 1];
					var use_YN = tr.children[2].children[0].checked;
					if (use_YN)
					{
						player.items[i].previously_checked = true;
						if (player.items[i].type == phase)
						{
							player.items[i].action();
							new_status_text += player.items[i].status_text + "<br/>";
						}
					}
					else
					{
						player.items[i].previously_checked = false;
					}
				}
			}
			
			if (phase == "player_turn_end")
			{
				if (this.monster.health > 0)
				{
					var monster_attack_index = Math.floor(Math.random()*this.monster.attacks.length);
					this.monster.attacks[monster_attack_index].action();
					new_status_text += this.monster.attacks[monster_attack_index].status_text;
				}
				else
				{
					new_status_text += "The monster is vanquished!<br/>";
				}
			}
		}
		
		for (let i = player.items.length - 1; i >= 0; i -= 1)
		{
			if (player.items[i].remove_me)
			{
				player.items.splice(i, 1);
			}
		}
		
		$('#statusP').html(new_status_text);
		
		if (this.monster.attack_damage > 0)
		{
			this.monster.has_attacked = true;
		}
		
		if (this.monster.health > 0)
		{
			this.begin_round();
		}
		else
		{
			game.set_state("victory");
		}
	},
	begin_round: function()
	{
		this.monster.new_round();
		this.draw_monster_on_canvas();
		
		//show monster health
		$('#monsterStatusP').text(
			this.monster.type.charAt(0).toUpperCase() + this.monster.type.slice(1) //capitalize first letter of monster's name
			+ " health: " + this.monster.health + " / " + this.monster.max_health);
		
		if (this.monster.undead)
		{
			$('#monsterStatusP').text($('#monsterStatusP').text() + " (undead)");
		}
		
		$("#battleTable").find('tbody').html('');
		
		for (let i = 0; i < player.items.length; i += 1)
		{
			var move_row = `<tr data-value=player.items[${i}]><td>${player.items[i].name}</td><td>${player.items[i].desc}</td>` + 
				`<td><input type="checkbox"></td></tr>`;
			$("#battleTable").find('tbody').append(move_row);
		}
		
		//check by default?
		for (let i = 0; i < player.items.length; i += 1)
		{
			if (player.items[i].previously_checked != null)
			{
				var tr = $('#battleTable tr')[i + 1];
				tr.children[2].children[0].checked = player.items[i].previously_checked;
			}
		}
		
		if (player.items.length == 0)
		{
			var move_row = `<tr><td>(You don't have any items. Tough luck, pal.)</td><td></td>` + 
				`<td><input type="checkbox" disabled="true"></td></tr>`;
			$("#battleTable").find('tbody').append(move_row);
		}
		
		var submission_row = '<tr><td colspan=\'2\'></td><td><button onclick=\'battle.end_turn()\' id=\'submitButton\'>Submit</button></td></tr>';
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