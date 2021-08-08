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
				player.items.push(this.cart_items[i]);
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
			use: function() {
				battle.monster.health -= 1;
			}
		},
		{
			name: "rock",
			desc: "deal 3 damage once",
			cost: 2,
			use: function() {
				battle.monster.health -= 3;
				player.remove_item(this.name);
			}
		},
		{
			name: "shield",
			desc: "prevent a lethal monster attack, once",
			cost: 1,
			passive: true,
		},
		{
			name: "armor",
			desc: "reduce monster damage by 1",
			cost: 3,
			passive: true,
		},
		{
			name: "cross",
			desc: "deal 1 damage to undead monsters every turn",
			cost: 2,
			use: function() {
				if (battle.monster.undead)
				{
						battle.monster.health -= 1;
				}	
			}
		},
		{
			name: "holy water",
			desc: "deal 3 damage to an undead monster, once",
			cost: 1,
			use: function() {
				if (battle.monster.undead)
				{
					battle.monster.health -= 3;
					player.remove_item(this.name);
				}	
			}
		},
		{
			name: "metal detector",
			desc: "gain $1 every time a monster is defeated",
			cost: 5,
			passive: true
		},
		{
			name: "investment portfolio",
			desc: "gain $1 every turn",
			cost: 8,
			use: function () {
				shop.cash += 1;
			}
		},
		{
			name: "chainmail",
			desc: "ignore the first monster attack of every battle",
			cost: 10,
			single_use: false
		},
		{
			name: "transformation potion",
			desc: "transform a monster into a different type of monster, once",
			cost: 1,
			single_use: true
		},
		{
			name: "healthcare",
			desc: "pay $5 to ignore the next monster attack",
			cost: 2,
			single_use: false
		},
		{
			name: "big sword",
			desc: "deal 2 damage every turn",
			cost: 5,
			single_use: false
		},
		{
			name: "huge sword",
			desc: "deal 3 damage every turn",
			cost: 7,
			single_use: false
		},
		{
			name: "truly enormous sword",
			desc: "deal 4 damage every turn",
			cost: 9,
			single_use: false
		}
	]
};