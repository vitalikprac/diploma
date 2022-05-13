import { Divider } from 'antd';

import * as S from './Describe.styled';

const Describe = () => (
  <S.Wrapper>
    <div>
      1) <b>Ієрархічне об`єднання меж</b> - дозволяє візуалізувати відносини
      суміжності між суміжностями, організованими в наборі даних. Ідея полягає в
      тому, щоб об`єднати суміжності разом за спеціальним критерієм і полегшити
      візуалізацію зв`язків.
    </div>
    <Divider />
    <div>2) Приклад :</div>
    <img src={null} alt="demo_full" height={600} />
    <div>3) Вибір кольору</div>
    <img src={null} alt="zoom" height={100} />
    <div>4) Вибір </div>
  </S.Wrapper>
);

export default Describe;
