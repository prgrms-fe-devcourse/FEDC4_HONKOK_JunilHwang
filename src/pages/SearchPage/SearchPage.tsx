import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '~/components/common';
import { Header } from '~/components/domain';
import { useForm } from '~/hooks';
import { useSearchAll } from '~/services/searchService';

const SearchPage = () => {
  const [query, handleQuery] = useForm();
  const { data: SearchResult } = useSearchAll({ query });

  const { state } = useLocation();
  const [selectedQuery, setSelectedQuery] = useState('all');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = event.currentTarget;
    debugger;
    setSelectedQuery(name);
  };

  const activeButtonStyle =
    'after:absolute after:-bottom-1 after:left-0 after:h-[5px] after:w-full after:content-[""] after:bg-main-lighten after:rounded-md';

  return (
    <article>
      <Header leftArea="left-arrow" rightArea={false}>
        검색
      </Header>
      <section
        className="mb-3 flex border-b-2 border-gray-200"
        onClick={handleClick}
      >
        <Button
          name="all"
          className={`relative h-full flex-1 py-3 ${
            selectedQuery === 'all' && activeButtonStyle
          }`}
        >
          전체
        </Button>
        <Button
          name="post"
          className={`relative h-full flex-1 py-3 ${
            selectedQuery === 'post' && activeButtonStyle
          }`}
        >
          포스트
        </Button>
        <Button
          name="user"
          className={`relative h-full flex-1 py-3 ${
            selectedQuery === 'user' && activeButtonStyle
          }`}
        >
          유저
        </Button>
      </section>
    </article>
  );
};

export default SearchPage;
