import openai
from openai import OpenAI as open_module
import requests
import urllib.request
from flask import Flask, jsonify, request, url_for, render_template_string
from flask_cors import CORS

from dotenv import load_dotenv
import os, io, sys
import base64       # 이미지 인코딩하기 위해
import time
import json

from PIL import Image
from rembg import remove

##########################################################
#   배경 제거 및 이미지 resize
##########################################################
def remove_background(image_src, image_path, image_filename, type):
    # 이미지 데이터를 바이트 스트림으로 변환
    image_byte_array = io.BytesIO(image_src)
    # Pillow 이미지로 변환
    origin_image = Image.open(image_byte_array)
    # 128x128 나무 크기로 조정
    resized_image = origin_image.resize((128,128), Image.NEAREST)
    # 배경 제거
    if type == 'text':    
        output_image = remove(
                resized_image,
                alpha_matting=True,
                alpha_matting_foreground_threshold=80,
                alpha_matting_background_threshold=40,
                alpha_matting_erode_structure_size=5,
                alpha_matting_base_size=1500,
                # I = αF + (1−α)B
            )
        print('Dall E - text로 요청 받음')
    elif type == 'image':
        output_image = remove(
                resized_image,
                alpha_matting=True,
                alpha_matting_foreground_threshold=30,
                alpha_matting_background_threshold=10, 
                alpha_matting_erode_structure_size=10, 
                alpha_matting_base_size=1500, 
                # I = αF + (1−α)B
            )
        print('User 제작 image로 요청 받음')
        
    else: 
        output_image = resized_image
        print('더미')

    output_image.save(image_path, 'png')

##########################################################
#   번역(한글 -> 영어)
##########################################################
def translateWord(user_input):
    url = "https://api-free.deepl.com/v2/translate"
    
    # 요청 본문 설정
    data = {
        "text": [user_input],
        "target_lang": "EN",
        "source_lang": "KO"
    }
    headers = {
        "Authorization": "DeepL-Auth-Key " + os.environ.get("DEEPL_API_KEY"),
        "Content-Type": "application/json"
    }
    
    # JSON 데이터로 인코딩
    data = json.dumps(data).encode("utf-8")
    
    # 요청 생성
    request = urllib.request.Request(url, data=data, headers=headers)
    
    try:
        # 요청 보내기
        response = urllib.request.urlopen(request)
        response_data = json.loads(response.read().decode('utf-8'))
        
        # 번역된 텍스트 추출
        translated_text = response_data["translations"][0]["text"]
        print(translated_text)
        return translated_text
        
    except urllib.error.HTTPError as e:
        print(f"HTTP Error: {e.code} - {e.reason}")
    except Exception as e:
        print(f"Error: {e}")



##########################################################  메인 함수 부분
# .env 파일에서 api_key 불러오기
load_dotenv()
client = open_module(
    api_key = os.environ.get("OPENAI_API_KEY"),
)

app = Flask(__name__)
CORS(app)
# CORS(app, supports_credentials=True, origins='*',allow_headers=["Content-Type", "Authorization", "Access-Control-Allow-Credentials"])

context_path = '/flask'

# @app.route(context_path + '/')
@app.route(context_path + '/hello', methods=['GET'])
def hello_world():
    return 'Hello, Flask Server on :)'

@app.route(context_path + '/remove_bg', methods=['POST'])
def remove_bg():
    if request.method == 'POST':
        if 'image' not in request.files:
            return '이미지 파일이 전송되지 않았습니다.', 400

        file = request.files['image']
        user_id = request.form.get('id')

        if file and user_id:
            image_data = file.read()

        # param_foreground = data.get('foreground')
        # param_background = data.get('background')
        # print('요청 들어옴: ', user_image, user_id)

        image_filename = f"gen_img_{user_id}_{time.localtime().tm_year}_{time.localtime().tm_mon}_{time.localtime().tm_mday}_{time.localtime().tm_hour}{time.localtime().tm_min}{time.localtime().tm_sec}.jpg"

        # 'static/images' 디렉토리가 없으면 생성
        image_directory = os.path.join('static', 'images')
        if not os.path.exists(image_directory):
            os.makedirs(image_directory)
        image_path = os.path.join(image_directory, image_filename)

        remove_background(image_data, image_path, image_filename, 'image')

        with open(image_path, "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read()).decode('utf-8')

        # 임시 저장된 파일 삭제
        os.remove(image_path)

        return jsonify({ 'image_data': encoded_string, 'image_name': image_filename }), 200

    else:
        print('잘못된 요청: remove_background')
        return


##########################################################
#   이미지 생성 및 배경 제거
##########################################################
@app.route(context_path + '/make_image', methods=['GET'])
def make_image():
    # 입력 폼에서 프롬프트 입력받으면, 
    if request.method == 'GET':
        # prompt = request.form['prompt']
        # prompt += ' with a thick black line at its boundary, animation, Pixel art, no background, no fruits'
        # print('입력받은 데이터: ', prompt)
        user_input = request.args.get('word')
        
        if user_input:
            translatedWord = translateWord(user_input)

            prompt = f"please create a simple animation-styled pixel art image of a cute {translatedWord} in animation style, with a white background. Ensure that the image includes only the {translatedWord} and no other elements or background."

            print("=====================")
            print('입력받은 데이터: ', prompt)
            print("=====================")

            # 테스트용 리턴
            # return jsonify ({ 'image_data': 'makeImage' }), 200;
            
            # prompt = "Image of a tree with a burning dot art feel"
            try:
                response = client.images.generate(
                    model="dall-e-3",
                    prompt=prompt,
                    n=1,    # default는 1이며 1개당 토큰이 나가고 그 이상은 돈이 개수만큼 나간다.
                    size="1024x1024",
                    quality="hd",
                    # response_format="url"
                )
                image_url = response.data[0].url
                image_data = requests.get(image_url).content
                image_filename = f"gen_img_{time.localtime().tm_year}_{time.localtime().tm_mon}_{time.localtime().tm_mday}_{time.localtime().tm_hour}{time.localtime().tm_min}{time.localtime().tm_sec}.jpg"
                # 'static/images' 디렉토리가 없으면 생성
                image_directory = os.path.join('static', 'images')
                if not os.path.exists(image_directory):
                    os.makedirs(image_directory)
                image_path = os.path.join(image_directory, image_filename)

                remove_background(image_data, image_path, image_filename, 'text')

                # 이미지 파일을 열고 base64로 인코딩
                with open(image_path, "rb") as image_file:
                    encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
                # encoded_string = base64.b64encode(image_data).decode('utf-8')
                # base64 인코딩된 이미지 데이터를 JSON으로 변환하여 반환

                os.remove(image_path)

                return jsonify({ 'image_data': encoded_string, 'image_name': image_filename }), 200
            except openai.error as e:
                return jsonify({ 'error': e }), 400
            
        else:
            print('유저 입력 데이터 없음!!')
    else:
        print('잘못된 요청')
        return
###############################################################################
# url 을 보내는 방식
# image_url = url_for("static", filename=f"images/cat.jpg", _external=True)
# return jsonify({'image_url': image_url}), 200
###############################################################################

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)