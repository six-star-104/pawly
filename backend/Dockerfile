# open jdk 17 버전의 환경 구성
FROM openjdk:17-alpine
# tzdata 패키지 설치 및 타임존 설정
RUN ln -snf /usr/share/zoneinfo/Asia/Seoul /etc/localtime && echo Asia/Seoul > /etc/timezone
# build가 되는 시점에 JAR_FILE 경로에 jar파일 생성
ARG JAR_FILE=/build/libs/pawly-0.0.1-SNAPSHOT.jar

COPY ${JAR_FILE} /pawlyspring.jar

# 운영 및 개발에서 사용되는 환경 설정을 분리
ENTRYPOINT ["java","-jar","-Dspring.profiles.active=prod", "-Duser.timezone=Asia/Seoul", "/pawlyspring.jar"]
