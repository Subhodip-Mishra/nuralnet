from flask import Flask, request, jsonify, render_template_string
from flask_cors import CORS
from dotenv import load_dotenv
import os
import google.generativeai as genai
from youtube_transcript_api import YouTubeTranscriptApi
from langdetect import detect
from googletrans import Translator
from functools import lru_cache
import asyncio

load_dotenv()

app = Flask(__name__)
CORS(app)

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

prompt = (
    "Generate a detailed summary of the provided YouTube video transcript, "
    "focusing on key points, important details, and notable insights. Ensure the summary "
    "is informative, well-structured, and concise, covering the main topics discussed in the video within 500 words. When you write heading then you write this in underline format."
)

translator = Translator()

@lru_cache(maxsize=128)
def extract_transcript_details(youtube_video_url):
    try:
        video_id = youtube_video_url.split("=")[1]
        transcript_text = YouTubeTranscriptApi.get_transcript(video_id)
        transcript = " ".join([i["text"] for i in transcript_text])
        return transcript
    except Exception as e:
        raise e

async def fetch_generative_content(transcript_text):
    model = genai.GenerativeModel("gemini-pro")
    response = model.generate_content(prompt + transcript_text)
    return response.text

def translate_text(text, src_lang, dest_lang='en'):
    translation = translator.translate(text, src=src_lang, dest=dest_lang)
    return translation.text

@app.route('/')
def home():
    return render_template_string("""
    <h1>Welcome to the Web Application</h1>
    <p>This is the Flask app. Go to <a href="/streamlit">Streamlit App</a> for YouTube Transcript to Notes Converter.</p>
    """)

@app.route('/hello', methods=['GET'])
def hello():
    return jsonify({"message": "Hello, World!"})

@app.route('/summarize', methods=['POST'])
async def summarize():
    data = request.json
    youtube_url = data.get("url")
    
    try:
        # Extract transcript
        transcript_text = extract_transcript_details(youtube_url)
        
        # Detect language
        detected_language = detect(transcript_text)
        
        # Translate transcript if necessary
        if detected_language != 'en':
            transcript_text = translate_text(transcript_text, detected_language, 'en')
        
        # Generate summary
        summary = await fetch_generative_content(transcript_text)
        
        # Optionally translate summary back to original language
        if detected_language != 'en':
            summary = translate_text(summary, 'en', detected_language)
        
        return jsonify({"summary": summary})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
