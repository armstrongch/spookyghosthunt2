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
			name: "wave",
			action: function() {
				//do nothing
				this.status_text = "The monster waves \"hello\" at you.";
			},
			monster_types: ["all"]
		}
	]
}