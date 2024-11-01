import React from "react";
import { data } from "./mockdata";
import { PostIt } from "@/components/PostIt";
// 특정 하나의 롤링 페이퍼만 볼 수 있는 페이지
export const RollingPaper = () => {

  // 가능한 말풍선 선택지
  // 사이즈  mini  medium  large  - large는 너무크고, medium은 우측 말꼬리가 짤려서, mini랑 기본사이즈로 통일을할까...?
  //  그림자 여부  shadow    - 얘를 default로 넣을까...?
  //  말꼬리 방향  top right left bottom   -- 랜덤 아니면 유저가 지정 가능하도록...?

  return (
    <div>
      <h1>누구누구의 롤링페이퍼</h1>
      {/* 무한스크롤 페이지네이션 고려하기 */}
      {data.content.map((postit, index) => (<>
        <PostIt key={index} props={postit} />
        <PostIt key={index} props={postit} />
        <PostIt key={index} props={postit}/>
        <PostIt key={index} props={postit} />
        <PostIt key={index} props={postit} />
        <PostIt key={index} props={postit}/>
        </>
      ))}
    </div>
  );
};
