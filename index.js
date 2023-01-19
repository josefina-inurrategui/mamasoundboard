const songsSection = document.querySelector('#sounds');
const poemsSection = document.querySelector('#poems');
const stopButton = document.querySelector('#stopButton');
const allButton = document.querySelector('#allButton');

const players = [];
let audios;

stopButton.addEventListener('click', stopAll); 
allButton.addEventListener('click', playAll);


function stopAll() {
    players.forEach((item) => {
        item.soundDiv.className = 'sound';
        item.player.pause();
    });
}
let audioPointer; 
let audio; 

function playAll() { 
    if (audio) { 
      audio.pause(); 
    } 
    audioPointer = 0; 
    playNext(); 
} 

function playNext() { 
    if (audioPointer < players.length) { 
      audio = players[audioPointer].player; 
      audio.addEventListener("ended", playNext); 
      audio.play(); 
      audioPointer += 1; 
    }
} 

async function getSounds() {
    const response = await fetch('./sounds.json');
    const json = await response.json();
    audios = json
};

(async () => {
    await getSounds();
    showSounds();
})();

const showSounds = () => {
    const poems = audios.filter(item => item.type === 'poem');
    const songs = audios.filter(item => item.type === 'song');

    songs.forEach(song => {
        const soundDiv = document.createElement('div');
        soundDiv.className = 'sound';
        const soundTitle = document.createElement('p');
        soundTitle.textContent = song.title;
        soundDiv.appendChild(soundTitle);

        const player = document.createElement('audio');
        player.setAttribute('src', `sounds/${song.src}`)
        soundDiv.appendChild(player);
        players.push({ player, soundDiv });

        soundDiv.addEventListener('click', () => {
            stopAll();
            soundDiv.className = 'play'
            soundPress(player);
        });
        songsSection.appendChild(soundDiv);
    })
    poems.forEach(poem => {
        const soundDiv = document.createElement('div');
        soundDiv.className = 'sound';
        const soundTitle = document.createElement('p');
        soundTitle.textContent = poem.title;
        soundDiv.appendChild(soundTitle);

        const player = document.createElement('audio');
        player.setAttribute('src', `sounds/${poem.src}`)
        soundDiv.appendChild(player);
        players.push({ player, soundDiv });

        soundDiv.addEventListener('click', () => {
            stopAll();
            soundDiv.className = 'play'
            soundPress(player);
        });
        poemsSection.appendChild(soundDiv);
    })
}

function soundPress(player) {
    player.currentTime = 0;
    player.play();

}
