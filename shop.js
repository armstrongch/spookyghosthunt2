var shop =
{
	cash: 10,
	cart_total: 0,
	cart_items: [],
	purchase: function()
	{
		this.update_cart();
		if (this.cart_total <= this.cash)
		{
			this.cash -= this.cart_total;
			for (let i = 0; i < this.cart_items.length; i += 1)
			{
				player.items.push(resources.clone_object(this.cart_items[i]));
			}
			for (let i = 0; i < player.items.length; i += 1)
			{
				player.items[i].remove_me = false;
			}
			game.set_state("battle");
		}
	},
	update_cart: function()
	{
		this.cart_total = 0;
		this.cart_items = [];
		for (let i = 0; i < this.wares.length; i += 1)
		{
			var tr = $('#shopTable tr')[i + 1];
			var ware = eval($(tr).data('value'));
			var cost = ware.cost;
			var count = tr.children[3].children[0].value;
			for (let j = 0; j < count; j += 1)
			{
				this.cart_items.push(ware);
			}
			this.cart_total += cost*count;
		}
		$('#totalTD').text("$" + this.cart_total);
		$('#purchaseButton').prop('disabled', this.cart_total > this.cash);
	},
	setup: function()
	{
		$('#statusP').text('You have $' + this.cash + ' to spend.');
		$("#shopTable").find('tbody').html('');
		for (let i = 0; i < this.wares.length; i += 1)
		{
			var ware_row = `<tr data-value=this.wares[${i}]><td>${this.wares[i].name}</td><td>${this.wares[i].desc}</td>` + 
				`<td>${"$"+this.wares[i].cost}</td><td><input type="number" min=0 value=0 onchange=\'shop.update_cart()\'></td></tr>`;
			$("#shopTable").find('tbody').append(ware_row);
		}
		var purchase_row = '<tr><td></td><td style=\'text-align:right\'>Total:</td><td id=\'totalTD\'>$0</td>' +
			'<td><button id=\'purchaseButton\' onclick=\'shop.purchase()\'>Purchase/Continue</button></td></tr>';
		$("#shopTable").find('tbody').append(purchase_row);
	},
	wares: [
		{
			name: "sword",
			desc: "deal 1 damage every turn",
			cost: 3,
			type: "player_turn_end",
			action: function() {
				battle.monster.health -= 1;
				this.status_text = "Your sword deals 1 damage!";
			}
		},
		{
			name: "rock",
			desc: "deal 3 damage once",
			cost: 2,
			type: "player_turn_end",
			action: function() {
				battle.monster.health -= 3;
				this.remove_me = true;
				this.status_text = "Your rock deals 3 damage!";
			}
		},
		{
			name: "shield",
			desc: "prevent a lethal monster attack, once",
			cost: 1,
			type: "monster_turn_end",
			action: function() {
				if (battle.monster.attack_damage > player.health)
				{
					this.status_text = "Your shield saves your life, blocking " + battle.monster.attack_damage + " damage!";
					battle.monster.attack_damage = 0;
					this.remove_me = true;
					
				}
				else
				{
					this.status_text = "Your shield remains unused.";
				}
			}
		},
		{
			name: "armor",
			desc: "reduce monster damage by 1",
			cost: 3,
			type: "monster_turn_end",
			action: function() {
				if (battle.monster.attack_damage >= 1)
				{
					this.status_text = "Your armor reduces the monster's attack damage by 1!";
					battle.monster.attack_damage -= 1;
				}
				else
				{
					this.status_text = "Your armor remains unused.";
				}
			},
		},
		{
			name: "cross",
			desc: "deal 1 damage to undead monsters every turn",
			cost: 2,
			type: "player_turn_end",
			action: function() {
				this.status_text = "";
				if (battle.monster.undead)
				{
					battle.monster.health -= 1;
					this.status_text = "Your cross deals 1 damage.";
				}	
			}
		},
		{
			name: "holy water",
			desc: "deal 3 damage to an undead monster, once",
			cost: 1,
			type: "player_turn_end",
			action: function() {
				this.status_text = "";
				if (battle.monster.undead)
				{
					battle.monster.health -= 3;
					this.remove_me = true;
					this.status_text = "Your holy water deals 3 damage.";
				}	
			}
		},
		{
			name: "metal detector",
			desc: "gain $1 every time a monster is defeated",
			cost: 5,
			type: "battle_end",
			action: function() {
				shop.cash += 1;
				this.status_text = "Your metal detector reveals $1.";
			}
		},
		{
			name: "investment portfolio",
			desc: "gain $1 every turn",
			cost: 8,
			type: "player_turn_end",
			action: function () {
				shop.cash += 1;
				this.status_text = "Your investment portfolio yields $1.";
			}
		},
		{
			name: "chainmail",
			desc: "ignore the first monster attack of every battle",
			cost: 10,
			type: "monster_turn_end",
			action: function() {
				this.status_text = "";
				if (!battle.monster.has_attacked)
				{
					if (battle.monster.attack_damage > 0)
					{
						this.status_text = "Your chainmail blocks " + battle.monster.attack_damage + " damage!";
						battle.monster.attack_damage = 0;
					}
					else
					{
						this.status_text = "Your chainmail remains unused.";
					}
				}
			}
		},
		{
			name: "transformation potion",
			desc: "transform a monster into a different type of monster, once",
			cost: 1,
			type: "player_turn_end",
			action: function() {
				var old_monster_type = battle.monster.type;
				while(battle.monster.type == old_monster_type)
				{
					battle.monster = monster_factory.new_random_monster();
				}
				this.remove_me = true;
				this.status_text = "Your potion transforms the monster!";
			}
		},
		{
			name: "healthcare",
			desc: "pay $5 to ignore the next monster attack",
			cost: 2,
			type: "monster_turn_end",
			action: function() {
				this.status_text = "";
				if (battle.monster.attack_damage > 0)
				{
					if (shop.cash >= 5)
					{
						battle.monster.attack_damage = 0;
						shop.cash -= 5;
						this.status_text = "Your healthcare stops the monster's attack! You are billed $5.";
					}
				}
			}
		},
		{
			name: "big sword",
			desc: "deal 2 damage every turn",
			cost: 5,
			type: "player_turn_end",
			action: function() {
				battle.monster.health -= 2;
				this.status_text = "Your big sword deals 2 damage!";
			}
		},
		{
			name: "huge sword",
			desc: "deal 3 damage every turn",
			cost: 7,
			type: "player_turn_end",
			action: function() {
				battle.monster.health -= 3;
				this.status_text = "Your huge sword deals 3 damage!";
			}
		},
		{
			name: "truly enormous sword",
			desc: "deal 4 damage every turn",
			cost: 9,
			type: "player_turn_end",
			action: function() {
				battle.monster.health -= 4;
				this.status_text = "Your truly enormous sword deals 4 damage!";
			}
		}
	]
};