function new_monster(type)
{
	var monster = {};
	monster.monster_image = eval("resources.monster_images." + type);
	monster.type = type;
	monster.max_health = 5;
	monster.health = monster.max_health;
	return monster;
}

function new_random_monster()
{
	var random_int = Math.floor(Math.random()*6);
	switch(random_int)
	{
		case 0: return new_monster("ghost"); break;
		case 1: return new_monster("skeleton"); break;
		case 2: return new_monster("devil"); break;
		case 3: return new_monster("pumpkin"); break;
		case 4: return new_monster("goblin"); break;
		case 5: return new_monster("vampire"); break;
	}
}