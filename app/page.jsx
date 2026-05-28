import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  ClipboardList,
  FileText,
  Gavel,
  GraduationCap,
  Landmark,
  MessageSquareQuote,
  ShieldCheck,
  UsersRound
} from "lucide-react";
import { roles, sequence, quickLinks } from "@/lib/mockTrialContent";

const roleIcons = {
  lawmaker: Landmark,
  prosecutor: FileText,
  lawyer: ShieldCheck,
  judge: Gavel,
  jury: UsersRound,
  witness: MessageSquareQuote
};

export default function HomePage() {
  return (
    <main>
      <header className="site-header">
        <Link href="/" className="brand" aria-label="처음으로">
          <span className="brandMark">법</span>
          <span>우리 반 모의재판</span>
        </Link>
        <nav className="top-nav" aria-label="주요 메뉴">
          <a href="#roles">역할별</a>
          <a href="#flow">수업 흐름</a>
          <a href="#resources">자료</a>
        </nav>
      </header>

      <section className="hero">
        <div className="heroText">
          <p className="kicker">학급 법 만들기 + 토론 + 법 적용 + 모의재판</p>
          <h1>내 역할이 헷갈릴 때마다 바로 확인하는 학생용 자료실</h1>
          <p className="heroLead">
            법안을 만드는 사람, 공소장을 쓰는 사람, 피고인을 돕는 사람, 판결하는 사람까지
            각 역할이 무엇을 준비하고 어떤 말을 해야 하는지 한 화면에서 찾을 수 있게 정리했습니다.
          </p>
          <div className="heroActions">
            <a className="primaryButton" href="#roles">
              역할 고르기 <ArrowRight aria-hidden size={18} />
            </a>
            <a className="ghostButton" href="/활동지/index.html">
              활동지 열기 <ClipboardList aria-hidden size={18} />
            </a>
          </div>
        </div>
        <div className="briefingPanel" aria-label="수업 핵심 원칙">
          <div className="panelHeader">
            <GraduationCap aria-hidden size={22} />
            <span>수업 핵심</span>
          </div>
          <p>
            이 재판은 친구를 혼내는 시간이 아닙니다. 우리 반의 문제를 공정한 절차로 살펴보고,
            처벌보다 회복과 재발 방지를 생각하는 연습입니다.
          </p>
          <ul>
            <li>사람이 아니라 행동을 봅니다.</li>
            <li>소문보다 증거와 출처를 확인합니다.</li>
            <li>예외와 피고인의 권리를 함께 살핍니다.</li>
          </ul>
        </div>
      </section>

      <section id="roles" className="section">
        <div className="sectionHeader">
          <p className="kicker">Role Guide</p>
          <h2>역할별 준비실</h2>
          <p>학생들이 자기 역할 페이지에 들어가서 오늘 해야 할 일을 순서대로 확인할 수 있습니다.</p>
        </div>
        <div className="roleGrid">
          {roles.map((role) => {
            const Icon = roleIcons[role.slug] ?? BookOpenCheck;
            return (
              <Link href={`/roles/${role.slug}`} className="roleCard" key={role.slug}>
                <span className="roleIcon" style={{ "--role-color": role.color }}>
                  <Icon aria-hidden size={24} />
                </span>
                <span className="roleMeta">{role.studentName}</span>
                <h3>{role.name}</h3>
                <p>{role.short}</p>
                <span className="cardLink">
                  자세히 보기 <ArrowRight aria-hidden size={16} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section id="flow" className="section band">
        <div className="sectionHeader">
          <p className="kicker">Class Flow</p>
          <h2>전체 수업 구조</h2>
          <p>역할 학습에서 끝나지 않고 법이 만들어지고 적용되는 흐름까지 이어집니다.</p>
        </div>
        <div className="timeline">
          {sequence.map((item, index) => (
            <article className="timelineItem" key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="resources" className="section">
        <div className="sectionHeader">
          <p className="kicker">Resources</p>
          <h2>기존 자료 바로가기</h2>
          <p>HTML 활동지와 기존 대본 자료도 그대로 연결해 두었습니다.</p>
        </div>
        <div className="resourceGrid">
          {quickLinks.map((link) => (
            <a className="resourceCard" href={link.href} key={link.href}>
              <BookOpenCheck aria-hidden size={22} />
              <div>
                <h3>{link.title}</h3>
                <p>{link.description}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
