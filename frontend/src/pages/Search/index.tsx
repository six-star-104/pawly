import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import * as style from "./styles";
import { Header } from "@/components/Header";
import { searchUser } from "@/apis/userService";

interface SearchResult {
  memberId: number;
  nickname: string;
  assets: string;
}

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const keyword = searchParams.get("keyword");
    if (keyword) {
      setSearchTerm(decodeURIComponent(keyword));
      handleSearch(decodeURIComponent(keyword));
    }
  }, [searchParams]);

  const handleSearch = async (term: string) => {
    if (!term.trim()) return;

    try {
      setIsLoading(true);
      const results = await searchUser(term);
      setSearchResults(results);
    } catch (error) {
      console.error("Failed to search:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchParams({ keyword: searchTerm });
      handleSearch(searchTerm);
    }
  };

  return (
    <div>
      <Header />
      <div css={style.searchWrapper}>
        <form css={style.searchContainer} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="닉네임 or 이름으로 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">
            <img
              src="https://unpkg.com/pixelarticons@1.8.1/svg/search.svg"
              alt="search"
            />
          </button>
        </form>
      </div>

      <div css={style.resultsContainer}>
        {isLoading ? (
          <div css={style.messageContainer}>검색 중...</div>
        ) : searchResults.length > 0 ? (
          <div css={style.resultsList}>
            {searchResults.map((result) => (
              <div
                key={result.memberId}
                css={style.searchResultItem}
                // onClick={() => openDetailModal(result.memberId)}
              >
                <img src={result.assets} alt="" />
                <span css={style.nickname}>{result.nickname}</span>
              </div>
            ))}
          </div>
        ) : (
          <div css={style.messageContainer}>검색 결과가 없습니다.</div>
        )}
      </div>
    </div>
  );
};
