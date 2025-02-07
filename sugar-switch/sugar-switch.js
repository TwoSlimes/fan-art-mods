Game.registerMod('sugarSwitch',{
	init:function(){
		new Game.Upgrade('Sugar switch [off]','Turning this on will make all sugar lumps grow <b>twice as fast</b>, but halts all cookie production.<q>Don\'t use this sugar lump. Someone stuck wires in it!</q>',0,[0,0,'/sprites.png']);
		new Game.Upgrade('Sugar switch [on]','The switch is currently making sugar lumps grow <b>twice as fast</b>, but is halting all cookie production.<br> Turning it off will revert those effects.',0,[1,0,'/sprites.png'],function(){
			Game.Upgrades['Sugar switch [off]'].bought=0;
			Game.Upgrades['Sugar switch [off]'].unlocked=1;
		});
		eval('Game.computeLumpTimes='+Game.computeLumpTimes.toString().replace('Game.lumpOverripeAge=Game.lumpRipeAge+hour','if (Game.Has("Sugar switch [off]")){Game.lumpMatureAge /=2; Game.lumpRipeAge /=2};Game.lumpOverripeAge=Game.lumpRipeAge+hour'));
		Game.registerHook('cps',function(){if (Game.Has('Sugar switch [off]')) {return 0} else return 1})
		Game.Upgrades['Sugar switch [off]'].pool='toggle';
		Game.Upgrades['Sugar switch [off]'].priceLumps=1;
		Game.Upgrades['Sugar switch [off]'].order=40020;
		Game.Upgrades['Sugar switch [off]'].canBuyFunc=function(){return Game.lumps>=1;};
		Game.Upgrades['Sugar switch [off]'].clickFunction=Game.spendLump(1,'activate the <b>sugar switch</b>',function(){
			Game.Upgrades['Sugar switch [off]'].buy(1);
			Game.Upgrades['Sugar switch [on]'].bought=0;
			Game.Upgrades['Sugar switch [on]'].unlocked=1;
		});
		Game.Upgrades['Sugar switch [on]'].pool='toggle';
		Game.Upgrades['Sugar switch [on]'].order=40021;
		Game.Unlock('Sugar switch [off]');
		LocalizeUpgradesAndAchievs();
		if (l('artcredits')) {
			l('artcredits').innerHTML+='<div class="listing">• Sugar Switch - that_1_shadow <small>(discord)</small>. <a href="https://discord.com/channels/412363381891137536/416701488719724564/1336937667803217920">Link</a></div>';
		} else {
			Game.updateLog=Game.updateLog.replace('first!</div>',''+
			'first!</div><div class="subsection update small"><div class="title">Art Credits</div><div id="artcredits">'+
			'<div class="listing">• Sugar Switch - that_1_shadow <small>(discord)</small>. <a href="https://discord.com/channels/412363381891137536/416701488719724564/1336937667803217920">Link</a></div>'+
			'</div>');
		};
	},
	save:function(){
		let str = Game.Upgrades['Sugar switch [off]'].bought +'';
		return str;
	},
	load:function(str){
		if (str == 1) {
			Game.Upgrades['Sugar switch [off]'].bought = 1;
			Game.Upgrades['Sugar switch [on]'].unlocked = 1;
		} else {
			Game.Upgrades['Sugar switch [on]'].bought = 1;
			Game.Upgrades['Sugar switch [off]'].unlocked = 1;
		}
	},
})
