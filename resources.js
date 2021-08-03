var resources =
{
	load: function() {
		monster_images = this.monster_images;
		
		monster_images.ghost = new Image();
		monster_images.ghost.src = 'Ghost.png';
		
		monster_images.vampire = new Image();
		monster_images.vampire.src = 'Vampire.png';
		
		monster_images.goblin = new Image();
		monster_images.goblin.src = 'Goblin.png';
		
		monster_images.devil = new Image();
		monster_images.devil.src = 'Devil.png';
		
		monster_images.pumpkin = new Image();
		monster_images.pumpkin.src = 'Pumpkin.png';
		
		monster_images.skeleton = new Image();
		monster_images.skeleton.src = 'Skeleton.png';
	},
	
	colors: {
		orange: "#FFE74C",
		red: "#FF5964",
		green: "#6BF178",
		blue: "#35A7FF",
		white: "#FFFFFF",
		black: "#433A3F"
	},
	monster_images: {}
};