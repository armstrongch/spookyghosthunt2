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
	monster_images: {},
	
	//from: https://stackoverflow.com/questions/728360/how-do-i-correctly-clone-a-javascript-object
	clone_object: function(obj) {
		var copy;

		// Handle the 3 simple types, and null or undefined
		if (null == obj || "object" != typeof obj) return obj;

		// Handle Date
		if (obj instanceof Date) {
			copy = new Date();
			copy.setTime(obj.getTime());
			return copy;
		}

		// Handle Array
		if (obj instanceof Array) {
			copy = [];
			for (var i = 0, len = obj.length; i < len; i++) {
				copy[i] = this.clone_object(obj[i]);
			}
			return copy;
		}

		// Handle Object
		if (obj instanceof Object) {
			copy = {};
			for (var attr in obj) {
				if (obj.hasOwnProperty(attr)) copy[attr] = this.clone_object(obj[attr]);
			}
			return copy;
		}

		throw new Error("Unable to copy obj! Its type isn't supported.");
	}
};