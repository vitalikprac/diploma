import { Divider } from 'antd';

import heatMapFull from './heatmap_full.png';
import heatmapHigh35 from './heatmap_high_35.png';
import hover from './hover.png';
import selectedElement from './selected_element.png';
import slider from './slider.png';
import * as S from './Describe.styled';

const Describe = () => (
  <S.Wrapper>
    <div>
      1) <b>Теплокарта</b> - являє собою графічне представлення даних, при якому
      окремі значення що містяться в матриці представлено у вигляді кольорів.
      <br />
      Фрактальні карти та деревоподібні карти часто використовують подібні
      системи кодування кольорів для представлення значень, яких набуває змінна
      в ієрархії.
    </div>
    <Divider />
    <div>2) Приклад теплокарти :</div>
    <img src={heatMapFull} alt="heatmap_full" height={500} />
    <div>
      3) При наведені мишою над будь яким елементом - з`являється віконце з
      описом
    </div>
    <img src={hover} alt="hover" height={300} />
    <div>
      4) Вибір чіткості границь (кольорова гама теплової карти формується на
      базі мінімального та максимального значення, 0-100 за замовчуванням)
    </div>
    <img src={slider} alt="slider" height={100} />
    <div>5) Приклад з чіткістю границь (1-35)</div>
    <img src={heatmapHigh35} alt="slider" height={500} />
    <div>6) Приклад обраного елементу</div>
    <img src={selectedElement} alt="selectedElement" height={500} />
  </S.Wrapper>
);

export default Describe;
