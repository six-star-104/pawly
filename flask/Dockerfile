# Python 이미지를 베이스로 사용
FROM python:3.9-slim

# 작업 디렉토리 설정
WORKDIR /app

# 필요한 파일 복사
COPY ./app /app
COPY requirements.txt /app

# 패키지 설치
RUN pip install --no-cache-dir -r requirements.txt

# Flask 애플리케이션 실행
CMD ["python", "/app/app.py"]
