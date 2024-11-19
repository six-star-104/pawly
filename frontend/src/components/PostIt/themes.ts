export const findTheme = (themeId:number) => {
  return themesSample.find((t) => t.themeId===themeId)
}

const themesSample = [
  {
      "themeId": 1,
      "themeName": "기본",
      "background": "#ffffff",
      "fontColor": "#000000",
      "borderColor": "#000000",
      "flag": true
  },
  {
      "themeId": 2,
      "themeName": "레드",
      "background": "#fd0000",
      "fontColor": "#FFFFFF",
      "borderColor": "#FF0000",
      "flag": true
  },
  {
      "themeId": 3,
      "themeName": "그린",
      "background": "#008000",
      "fontColor": "#FFFFFF",
      "borderColor": "#008000",
      "flag": true
  },
  {
      "themeId": 4,
      "themeName": "노랑",
      "background": "#FFFF00",
      "fontColor": "#000000",
      "borderColor": "#FFFF00",
      "flag": true
  },
  {
      "themeId": 5,
      "themeName": "핑크",
      "background": "#FFC0CB",
      "fontColor": "#000000",
      "borderColor": "#FFC0CB",
      "flag": true
  },
  {
      "themeId": 6,
      "themeName": "보라",
      "background": "#800080",
      "fontColor": "#FFFFFF",
      "borderColor": "#800080",
      "flag": true
  },
  {
      "themeId": 7,
      "themeName": "주황",
      "background": "#FFA500",
      "fontColor": "#000000",
      "borderColor": "#FFA500",
      "flag": false
  },
  {
      "themeId": 8,
      "themeName": "하늘",
      "background": "#87CEEB",
      "fontColor": "#000000",
      "borderColor": "#87CEEB",
      "flag": false
  },
  {
      "themeId": 9,
      "themeName": "회색",
      "background": "#808080",
      "fontColor": "#FFFFFF",
      "borderColor": "#808080",
      "flag": false
  },
  {
      "themeId": 10,
      "themeName": "검정",
      "background": "#000000",
      "fontColor": "#FFFFFF",
      "borderColor": "#000000",
      "flag": false
  },
  {
      "themeId": 11,
      "themeName": "테스트테마",
      "background": "",
      "fontColor": "#c02525",
      "borderColor": "#645151",
      "flag": false
  },
  {
      "themeId": 12,
      "themeName": "테스트",
      "background": "",
      "fontColor": "#000",
      "borderColor": "#ea2",
      "flag": false
  },
  {
      "themeId": 13,
      "themeName": "테스트2",
      "background": "",
      "fontColor": "#000",
      "borderColor": "#000",
      "flag": false
  },
  {
      "themeId": 14,
      "themeName": "테스트3",
      "background": "",
      "fontColor": "#fff",
      "borderColor": "#ea2",
      "flag": false
  },
  {
      "themeId": 15,
      "themeName": "할로윈!",
      "background": "https://st2.depositphotos.com/46898394/50276/v/380/depositphotos_502768918-stock-illustration-pixel-art-halloween-seamless-pattern.jpg",
      "fontColor": "#fff",
      "borderColor": "#ea2",
      "flag": false
  },
  {
      "themeId": 17,
      "themeName": "청록",
      "background": "",
      "fontColor": "#000000",
      "borderColor": "#17deb2",
      "flag": false
  },
  {
      "themeId": 18,
      "themeName": "파피몬",
      "background": "https://i.ibb.co/Lh01Ljc/image.jpg",
      "fontColor": "#ffffff",
      "borderColor": "#3280dd",
      "flag": false
  },
  {
      "themeId": 19,
      "themeName": "이벤트(1) 완료",
      "background": "#ffffff",
      "fontColor": "#ffffff",
      "borderColor": "#ffffff",
      "flag": false
  },
  {
      "themeId": 20,
      "themeName": "이벤트(2) 완료",
      "background": "#ffffff",
      "fontColor": "#ffffff",
      "borderColor": "#ffffff",
      "flag": false
  }
]
