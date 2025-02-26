class AudioGroupController {
    #audiosPlaying
    constructor() {
        this.#audiosPlaying = []
    }

    newAudioStarted(newAudio, options = {}, replaceAll = true){
        if(replaceAll) {
            const playingPlayers = new Set(this.#audiosPlaying.map(el => el.player))
            for (const audio of this.#audiosPlaying) {
                if(audio.player !== newAudio) {
                    this.#stop(audio)
                    // this.#fadeAndStop(audio)
                }
            }
            this.#audiosPlaying = []
        }

        this.#audiosPlaying.push({player : newAudio, ...options});
    }

    #stop(audio){
        audio.player.pause()
        audio.player.currentTime = 0;
        if(audio.onStop){
            audio.onStop()
        }
    }

    #fadeAndStop(audio){
        // This makes the stopping far less popping! (half the popping)
        if(audio.player.volume >= 0.5){
            audio.player.volume = audio.player.volume*0.9;
            setTimeout(()=>{this.#fadeAndStop(audio)}, 2);
        }else{
            audio.player.muted = true;
            audio.player.pause();
            audio.player.currentTime = 0;
            audio.player.volume = 1;
            audio.player.muted = false;
            if(audio.onStop){
                audio.onStop();
            }
        }
    }
}

const audioGroupController = new AudioGroupController();

export const useAudioGroupController = () => audioGroupController;
