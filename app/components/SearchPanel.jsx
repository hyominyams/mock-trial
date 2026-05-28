"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

export default function SearchPanel({ items }) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!normalizedQuery) return items.slice(0, 8);
    return items
      .map((item) => {
        const haystack = [item.type, item.title, item.description, ...(item.keywords ?? [])]
          .join(" ")
          .toLowerCase();
        const score = haystack.includes(normalizedQuery)
          ? item.title.toLowerCase().includes(normalizedQuery)
            ? 3
            : item.description.toLowerCase().includes(normalizedQuery)
              ? 2
              : 1
          : 0;
        return { ...item, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title, "ko"))
      .slice(0, 10);
  }, [items, normalizedQuery]);

  return (
    <section id="search" className="searchSection" aria-label="자료 검색">
      <div className="searchShell">
        <div>
          <p className="kicker">Search</p>
          <h2>필요한 자료 바로 찾기</h2>
          <p>예: 공소장, 변론, 출처, 판결문, 증인, 주장 글쓰기</p>
        </div>
        <label className="searchBox">
          <Search aria-hidden size={22} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="검색어를 입력하세요"
            aria-label="자료 검색어"
          />
        </label>
        <div className="searchResults">
          {results.length > 0 ? (
            results.map((item) => {
              const isInternal = item.href.startsWith("/roles") || item.href.startsWith("/examples");
              const content = (
                <>
                  <span className="resultType">{item.type}</span>
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                  <span className="resultLink">
                    열기 <ArrowRight aria-hidden size={15} />
                  </span>
                </>
              );
              return isInternal ? (
                <Link className="resultCard" href={item.href} key={`${item.type}-${item.href}`}>
                  {content}
                </Link>
              ) : (
                <a className="resultCard" href={item.href} key={`${item.type}-${item.href}`}>
                  {content}
                </a>
              );
            })
          ) : (
            <div className="emptyResult">
              <strong>검색 결과가 없습니다.</strong>
              <p>역할 이름이나 문서 이름으로 다시 찾아보세요.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
