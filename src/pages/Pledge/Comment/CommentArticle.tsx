import * as React from 'react';

import { Comment } from './Comment';
import { qnaArr } from 'candidateType';
import styled from 'styled-components';

export function CommentArticle({ qnaArr }: qnaArr) {
  return (
    <Article>
      {qnaArr &&
        qnaArr.map((qna, index) => {
          if (qna.type === 'question') {
            return <Comment key={index} qna={qna} />;
          }
          if (qna.type === 'answer') {
            return <Comment key={index} qna={qna} answer />;
          }
        })}
    </Article>
  );
}

const Article = styled.article`
  width: 100%;
`;
