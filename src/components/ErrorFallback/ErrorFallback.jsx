import { Button, Result } from 'antd';

import * as S from './ErrorFallback.styled';

const ErrorFallback = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <S.Wrapper>
      <Result
        status="500"
        title="Упс"
        subTitle="Щось пішло не так :("
        extra={
          <Button type="primary" onClick={handleRefresh}>
            Перезавантажити сторінку
          </Button>
        }
      />
    </S.Wrapper>
  );
};

export default ErrorFallback;
