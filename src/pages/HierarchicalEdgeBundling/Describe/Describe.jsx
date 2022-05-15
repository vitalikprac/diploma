import { Divider } from 'antd';

import connectionFull from './connections_full.png';
import emptyFullDemo from './empty_full_demo.png';
import fullDemo from './full_demo.png';
import hover from './hover.png';
import selectedElement from './selected_element.png';
import selectedFull from './selected_full.png';
import selectedWithAll from './selected_with_all.png';
import settings from './settings.png';
import * as S from './Describe.styled';

const Describe = () => (
  <S.Wrapper>
    <div>
      1) <b>Ієрархічне об`єднання меж</b> - дозволяє візуалізувати відносини
      суміжності між суміжностями, організованими в наборі даних.
      <br /> Ідея полягає в тому, щоб об`єднати суміжності разом за спеціальним
      критерієм і полегшити візуалізацію зв`язків.
    </div>
    <Divider />
    <div>2) Приклад ієрархічного об`єднання меж на довільному датасеті:</div>
    <img src={fullDemo} alt="full_demo" height={600} />
    <div>3) Приклад вибраного елементу (показує всі зв`язки)</div>
    <img src={selectedWithAll} alt="selected_with_all" height={500} />
    <div>4) Інформація про елемент на який наведено мишою</div>
    <img src={hover} alt="hover" height={200} />
    <div>5) Віконце з налаштуванням </div>
    <img src={settings} alt="settings" height={200} />
    <div>
      6) При відключеня пункту &ldquo;Відобразити всі зв`язки&ldquo; можемо
      отримати
    </div>
    <img src={emptyFullDemo} alt="emptyFullDemo" height={600} />
    <div>
      6.1) Приклад вибраного елементу під час відключення пункту
      &ldquo;Відобразити всі зв`язки&ldquo;
    </div>
    <img src={selectedFull} alt="selectedFull" height={600} />
    <div>
      7) При включенні пункту &ldquo;Сховати пусті зв`язки&ldquo; можемо
      отримати (ті елементи в яких немає зв`язків з іншими елементами -
      зникають)
    </div>
    <img src={connectionFull} alt="connectionFull" height={600} />
    <div>8) Приклад обраного елементу</div>
    <img src={selectedElement} alt="selected_element" height={500} />
  </S.Wrapper>
);

export default Describe;
