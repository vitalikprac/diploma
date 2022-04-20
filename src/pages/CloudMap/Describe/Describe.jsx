import { Divider } from 'antd';

import demoFull from './demo_full.png';
import itemFullData from './item_full_data.png';
import itemFullDataField from './item_full_data_field.png';
import itemFullDataFieldValue from './item_full_data_field_value.png';
import itemHover from './item_hover.png';
import oneItem from './one_item.png';
import zoom from './zoom.png';
import * as S from './Describe.styled';

const Describe = () => (
  <S.Wrapper>
    <div>
      1) <b>Хмара тегів (хмара слів, або зважений список) </b>— це візуальне
      подання списку категорій (або тегів, також званих мітками, ярликами,
      ключовими словами, тощо).
    </div>
    <Divider />
    <div>2) Приклад хмари тегів:</div>
    <img src={demoFull} alt="demo_full" height={600} />
    <div>
      3) Масштаб - допомагає орієнтуватися у збільшені/зменшені хмари тегів (за
      замовчуванням масштаб 1)
    </div>
    <img src={zoom} alt="zoom" height={100} />
    <div>4) Один елемент</div>
    <img src={oneItem} alt="one_item" height={300} />
    <div>
      5) Вибраний елемент (при натисканні на будь який алемент лівою кнопкою
      миші)
    </div>
    <img src={itemFullData} alt="item_full_data" height={600} />
    <div>6) Поле вибраного елемента</div>
    <img src={itemFullDataField} alt="item_full_data_field" height={100} />
    <div>7) Значення поля вибраного елемента</div>
    <img
      src={itemFullDataFieldValue}
      alt="item_full_data_field_value"
      height={100}
    />
    <div>
      8) При наведенні на будь який елемент мишою - отримуємо вспливаюче віконце
      з значенням (&quot;важливістю&quot;) цього поля{' '}
    </div>

    <img src={itemHover} alt="item_hover" height={100} />
  </S.Wrapper>
);

export default Describe;
