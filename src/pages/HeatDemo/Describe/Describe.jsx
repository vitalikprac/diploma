import { Divider } from 'antd';

import * as S from './Describe.styled';

const Describe = () => (
  <S.Wrapper>
    <div>
      1) <b>Теплокарта</b> - являє собою графічне представлення даних, при якому
      окремі значення що містяться в матриці представлено у вигляді кольорів.
      Фрактальні карти та деревоподібні карти часто використовують подібні
      системи кодування кольорів для представлення значень, яких набуває змінна
      в ієрархії.
    </div>
    <Divider />
    <div>2) Приклад теплокарти:</div>
    <img src={null} alt="demo_full" height={600} />
    <div>3) Вибір кольору від 0 до 100</div>
    <img src={null} alt="zoom" height={100} />
    <div>4) Вибір чіткості границь</div>
  </S.Wrapper>
);

export default Describe;
