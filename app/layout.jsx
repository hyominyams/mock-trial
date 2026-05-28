import "./globals.css";

export const metadata = {
  title: "우리 반 모의재판",
  description: "6학년 학급 법 만들기와 모의재판 역할별 학습 자료"
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
