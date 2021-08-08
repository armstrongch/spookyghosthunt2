var player = 
{
	items: [],
	max_health: 5,
	health: 5,
	remove_item: function(name)
	{
		for (let i = 0; i < this.items.length; i += 1)
		{
			if ((this.items[i].name == name) && (this.items[i].remove_me == null))
			{
				this.items[i].remove_me = true;
				i = this.items.length;
			}
		}
	}
};