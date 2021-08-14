var monster_factory = 
{
	new_monster: function(type)
	{
		var monster = 
		{
			new_round: function()
			{
				this.attack_damage = 0;
			},
			attack_damage: 0,
			has_attacked: false,
			attacks: []
		};
		monster.monster_image = eval("resources.monster_images." + type);
		monster.type = type;
		monster.max_health = 5;
		monster.health = monster.max_health;
		if ((type == "ghost") || (type == "skeleton") || (type == "vampire"))
		{
			monster.undead = true;
		}
		else
		{
			monster.undead = false;
		}
		
		for (let i = 0; i < this.monster_attacks.length; i += 1)
		{
			var monster_attack = this.monster_attacks[i];
			for (let j = 0; j < monster_attack.monster_types.length; j += 1)
			{
				if ((monster_attack.monster_types[j] == monster.type)
					|| (monster_attack.monster_types[j] == "all"))
				{
					monster.attacks.push(monster_attack);
				}
			}
		}
		return monster;
	},

	new_random_monster: function()
	{
		var random_int = Math.floor(Math.random()*6);
		switch(random_int)
		{
			case 0: return this.new_monster("ghost"); break;
			case 1: return this.new_monster("skeleton"); break;
			case 2: return this.new_monster("devil"); break;
			case 3: return this.new_monster("pumpkin"); break;
			case 4: return this.new_monster("goblin"); break;
			case 5: return this.new_monster("vampire"); break;
		}
	},
	
	monster_attacks: [
		{
			name: "bite",
			action: function() {
				//do nothing
				this.status_text = "The monster bites you, dealing 2 damage.";
				battle.monster.attack_damage = 2;
			},
			monster_types: ["all"]
		},
		{
			name: "curse",
			action: function() {
				var pre_cursed = false;
				for (let i = 0; i < player.items.length; i += 1)
				{
					if (player.items[i].name == "curse")
					{
						pre_cursed = true;
						i = player.items.length;
					}
				}
				if (pre_cursed)
				{
					this.status_text = "The monster cannot curse you, since you are already cursed!";
				}
				else
				{
					this.status_text = "The monster curses you! Consider yourself cursed!";
					player.items.push(resources.clone_object(monster_factory.cursed_item));
				}
			},
			monster_types: ["devil", "ghost", "pumpkin"]
		},
	],
	cursed_item: {
		name: "curse",
			desc: "Every time the curse is unused, lose 1 health. Use this item to pay $1 and dispell the curse for good.",
			cost: 0,
			type: "player_turn_end",
			action: function() {
				if (shop.cash >= 1)
				{
					shop.cash -= 1;
					this.remove_me = true;
					this.status_text = "Your debt is paid, and the curse is dispelled!";
				}
				else
				{
					this.status_text = "You do not have enough cash to dispell the curse, and lose 1 health!";
					player.health -= 1;
				}
			},
			passive: function() {
				this.status_text = "The curse steals 1 health!";
				player.health -= 1;
			}
	}
}