// index.ts
/** @jsxImportSource @emotion/react */
import React from "react";
import { SelectOptionsProps } from "./SelectOptions.type";
import { optionColor, container } from "./SelectOptions.style";
import { useState, useEffect } from "react";
import PixelContainer from "../PixelContainer";
// 색깔 선택창
const SelectOptions: React.FC<SelectOptionsProps> = ({
  selectOption,
  setPreview,
  previewPostIt,
}) => {
  const [colorOptions, setColorOptions] = useState<string[]>([]);

  useEffect(() => {
    if (selectOption == "backgroundColorer") {
      setColorOptions(["white", "black", "blue", "red", "yellow"]);
    } else if (selectOption == "fontColorer") {
      setColorOptions(["black", "white", "blue", "red", "yellow"]);
    } else if (selectOption == "borderColorer") {
      setColorOptions(["black", "white", "blue", "red", "yellow"]);
    } else {
      // 이미지가 배경일때,== selectOption이 image 일때
      //이런식으로 s3주소 넣어줘야됨
      setColorOptions([
        "https://st2.depositphotos.com/46898394/50276/v/380/depositphotos_502768918-stock-illustration-pixel-art-halloween-seamless-pattern.jpg",
        "https://h7.alamy.com/comp/2DC3KRA/vector-pixel-seamless-pattern-christmas-tree-knitted-background-2DC3KRA.jpg",
        "https://i.pinimg.com/564x/00/4b/9b/004b9ba3b559765a09c5f1785064827d.jpg",
      ]);
    }
  }, [selectOption]);

  const changeColor = (index: number) => {
    if (selectOption == "backgroundColorer") {
      setPreview({ ...previewPostIt, backgroundColor: index, image: "" });
    } else if (selectOption == "fontColorer") {
      setPreview({ ...previewPostIt, fontColor: index });
    } else if (selectOption == "borderColorer") {
      setPreview({ ...previewPostIt, borderColor: index });
    } else {
      setPreview({
        ...previewPostIt,
        image: colorOptions[index],
        backgroundColor: 0,
      });
    }
  };

  return (
    <div css={container}>
      {colorOptions.map((colorOption, index) => (
        <PixelContainer width="24px" height="24px" key={index}>
          <div
            css={optionColor(colorOption, selectOption)}
            onClick={() => changeColor(index)}
          ></div>
        </PixelContainer>
      ))}
    </div>
  );
};

export default SelectOptions;
