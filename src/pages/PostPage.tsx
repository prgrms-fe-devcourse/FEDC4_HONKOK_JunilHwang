const PostPage = () => {
  return (
    <div>
      <div className="h-[7.625rem] w-[24.375rem] bg-main-lighten ">
        <div>뒤로 가기 아이콘</div>
        <div>게시글</div>
        <div>검색 아이콘</div>
        <div>알림 아이콘</div>
      </div>
      <div>
        <div className="bg-white">
          <div>
            <div>
              <div>요리조리라벨</div>
              <div>김치찌개 5분 레시피 공유합니다</div>
              <div>
                <div>프로필 이미지</div>
                <div>
                  <div>게시물 작성자 닉네임</div>
                  <div>5분 전</div>
                </div>
                <div>group 아이콘 버튼</div>
              </div>
            </div>
          </div>
          <div>
            <div>게시글 첨부 이미지</div>
            <div>게시글 본문</div>
          </div>
          <div>
            <button>좋아요 3개</button>
          </div>
        </div>
        <div className="bg-gray-100">
          <div>댓글 2개</div>
          <div>
            <div>
              <div>프로필 사진</div>
              <div>
                <div>
                  <div>혼콕마스터</div>
                  <div>1분 전</div>
                </div>
                <div>유저 댓글</div>
              </div>
              <div>group 버튼</div>
            </div>
            <div>
              <div>프로필 사진</div>
              <div>
                <div>유저 닉네임</div>
                <div>유저 댓글</div>
              </div>
              <div>group 아이콘 버튼</div>
            </div>
          </div>
          <div>
            <div>악플은 금지! 따뜻한 댓글을 작성해보세요!</div>
            <button>등록</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
