# import time
# from fastapi import FastAPI, HTTPException
# from pydantic import BaseModel
# from pyneuphonic import Neuphonic, TTSConfig
# from pyneuphonic.player import AudioPlayer

# # Initialize FastAPI app
# app = FastAPI()

# # API Key for Neuphonic
# api_key = "acbf28a2cef0675c30f89562adc9d921615661714001e9b535018f78a561b21f.3d7d355e-f00b-42e4-a2ed-9dc78ccc7703"  # Replace with your API key
# client = Neuphonic(api_key=api_key)
# sse = client.tts.SSEClient()

# # Pydantic model for incoming requests
# class TTSRequest(BaseModel):
#     text: str
#     speed: float = 1.3
#     voice: str = "b19687fd-c5c9-4bda-9d52-756c3b10c88e"
#     model: str = "neu_hq"

# @app.post("/generate-audio/")
# def generate_audio(request: TTSRequest):
#     try:
#         # Configure TTS settings
#         tts_config = TTSConfig(
#             speed=request.speed,
#             voice=request.voice,
#             model=request.model
#         )

#         script = "This is a placeholder script. Replace this with your own script."

#         # Split text into sentences
#         input_sentence = request.text.split('. ')
#         # sentence = script.split('. ')
#         sentences = [sentence.strip() + '.' for sentence in sentences if sentence.strip()]

#         # Generate and play audio
#         with AudioPlayer() as player:
#             for i, sentence in enumerate(sentences):
#                 response = sse.send(sentence, tts_config=tts_config)
#                 player.play(response)

#                 # Pause for 5 seconds after each sentence except the last
#                 if i < len(sentences) - 1:
#                     time.sleep(3)

#         return {"status": "success", "message": "Audio played successfully!"}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))
    


import time
from fastapi import FastAPI, HTTPException
from pyneuphonic import Neuphonic, TTSConfig
from pyneuphonic.player import AudioPlayer

# Initialize FastAPI app
app = FastAPI()

# API Key for Neuphonic
api_key = "acbf28a2cef0675c30f89562adc9d921615661714001e9b535018f78a561b21f.3d7d355e-f00b-42e4-a2ed-9dc78ccc7703"  # Replace with your API key
client = Neuphonic(api_key=api_key)
sse = client.tts.SSEClient()

# Fixed TTS script
fixed_script = """This is a placeholder script. Replace with your own script."""

# Predefined TTS settings
tts_config = TTSConfig(
    speed=1,
    voice="8e9c4bc8-3979-48ab-8626-df53befc2090",
    model="neu_hq"
)

@app.get("/play-audio/")
def play_audio():
    try:
        # Split the script into sentences
        sentences = fixed_script.split('. ')
        sentences = [sentence.strip() + '.' for sentence in sentences if sentence.strip()]  # Ensure proper punctuation

        # Play audio for each sentence
        with AudioPlayer() as player:
            for i, sentence in enumerate(sentences):
                response = sse.send(sentence, tts_config=tts_config)
                player.play(response)

                # Pause for 5 seconds after each sentence except the last
                if i < len(sentences) - 1:
                    time.sleep(5)

        return {"status": "success", "message": "Audio played successfully!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    

