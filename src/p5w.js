/* ===== credits card in Settings (sounds and art sources) ===== */
const SND_CREDITS=[
 ['Button Clicks','u_xg7ssi08yr'],['Boxing bell dings','cartoon_music'],['Thud Impact Sound SFX','Virtual_Vibes'],
 ['count','Lindsayanng (Freesound)'],['Crowd Cheering in Stadium','vishiv (Wren West)'],['Crowd Booing','DRAGON-STUDIO'],
 ['Writing, Pen, Signature, Paper','Mediaman57 (Freesound)'],['New Notification 012','Universfield'],['Cash Register 1','ksjsbwuil'],['Dry Thunder Rumble','DRAGON-STUDIO'],['Phone ring office','TRP (Freesound)']];
Object.assign(D,{
 'cr.title':['Źródła dźwięku i grafiki','Sound and art credits'],
 'cr.snd':['Dźwięki z Pixabay (licencja treści Pixabay):','Sounds from Pixabay (Pixabay Content License):'],
 'cr.chant':['Skandowanie tłumu wygenerowano w ElevenLabs.','The crowd chant was generated with ElevenLabs.'],
 'cr.art':['Ilustracje, tła i obraz tytułowy zostały wygenerowane przy użyciu narzędzi AI na podstawie opisów autora gry. Wszystkie postacie są fikcyjne.','Illustrations, backgrounds and the title image were generated with AI tools from the game author’s prompts. All characters are fictional.']});
(function(){const _vs=vSettings;vSettings=function(){const h=_vs.apply(this,arguments);
 return h+'<div class="card stack"><h3>'+t('cr.title')+'</h3><div class="mute" style="font-size:13px;max-width:80ch"><div>'+t('cr.snd')+'</div><div>'+SND_CREDITS.map(c=>'„'+esc(c[0])+'” – '+esc(c[1])).join('; ')+'.</div><div style="margin-top:6px">'+t('cr.chant')+'</div><div style="margin-top:6px">'+t('cr.art')+'</div></div></div>'}})();
if(typeof normTexts==='function')normTexts();
