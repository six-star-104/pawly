/* eslint-disable */

//
declare namespace JSX {
  interface IntrinsicElements {
    "a-entity": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & { [key: string]: any }; // 추가 속성 허용
    "a-scene": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & { [key: string]: any };
    "a-camera": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & { [key: string]: any };
    "a-box": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & { [key: string]: any };
    "a-text": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & { [key: string]: any };
    // 필요한 A-Frame 태그들을 이와 같은 방식으로 추가
  }
}
