var shop =
{
	cash: 10,
	cart_total: 0,
	update_cart: function(input)
	{
		this.cart_total = 0;
		for (let i = 0; i < this.wares.length; i += 1)
		{
			var tr = $('#shopTable tr')[i + 1];
			var ware = eval($(tr).data('value'));
			var cost = ware.cost;
			var count = tr.children[3].children[0].value;
			this.cart_total += cost*count;
		}
		$('#totalTD').text("$" + this.cart_total);
	},
	setup: function()
	{
		$('#statusP').text('You have $' + this.cash + ' to spend.');
		for (let i = 0; i < this.wares.length; i += 1)
		{
			var ware_row = `<tr data-value=this.wares[${i}]><td>${this.wares[i].name}</td><td>${this.wares[i].desc}</td><td>${"$"+this.wares[i].cost}</td><td><input type="number" min=0 value=0 onchange=\'shop.update_cart(this)\'></td></tr>`;
			$("#shopTable").find('tbody').append(ware_row);
		}
		var purchase_row = '<tr><td></td><td style=\'text-align:right\'>Total:</td><td id=\'totalTD\'>$0</td><td><button>Purchase/Continue</button></td></tr>';
		$("#shopTable").find('tbody').append(purchase_row);
	},
	wares: [
		{
			name: "sword",
			desc: "deal 1 damage every turn",
			cost: 3
		},
		{
			name: "rock",
			desc: "deal 3 damage once",
			cost: 2
		},
		{
			name: "shield",
			desc: "prevent a lethal monster attack, once",
			cost: 1
		},
		{
			name: "armor",
			desc: "reduce monster damage by 1",
			cost: 3
		},
		{
			name: "cross",
			desc: "deal 1 damage to undead monsters every turn",
			cost: 2
		},
		{
			name: "holy water",
			desc: "deal 3 damage to an undead monster, once",
			cost: 1
		},
		{
			name: "metal detector",
			desc: "gain $1 every time a monster is defeated",
			cost: 5
		},
		{
			name: "investment portfolio",
			desc: "gain $1 every turn",
			cost: 8
		},
		{
			name: "chainmail",
			desc: "ignore the first monster attack of every battle",
			cost: 10
		},
		{
			name: "transformation potion",
			desc: "transform a monster into a different type of monster, once",
			cost: 1
		},
		{
			name: "healthcare",
			desc: "pay $5 to ignore the next monster attack",
			cost: 2,
			stock: 1
		},
		{
			name: "big sword",
			desc: "deal 2 damage every turn",
			cost: 5,
			stock: 1
		},
		{
			name: "huge sword",
			desc: "deal 3 damage every turn",
			cost: 7,
			stock: 1
		},
		{
			name: "truly enormous sword",
			desc: "deal 4 damage every turn",
			cost: 9,
			stock: 1
		}
	]
};