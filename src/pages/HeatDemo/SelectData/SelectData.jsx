import { Button, Divider, Input } from 'antd';
import { useContext } from 'react';
import ReactJson from 'react-json-view';

import HeatMap from '../../../components/HeatMap';
import { DataContext } from '../../../context/DataContext';
import { HeatMapContext } from '../../../context/HeatMapContext';

import { useTextFunction } from './useTextFunction';
import * as S from './SelectData.styled';

const { TextArea } = Input;

const defaultTextSelectFunction = `function prepare(item){
    return item.description.length;
}`;

const defaultHoverFunction = `function prepare(item){
    return \`Довжина опису публікації \${item}\`;
}`;

const SelectData = () => {
  const { data } = useContext(DataContext);
  const { sizeFunction, setSizeFunction, hoverFunction, setHoverFunction } =
    useContext(HeatMapContext);
  const firstItem = data?.[0];

  const { setSelectFunction, selectFunction, handleSaveFunction } =
    useTextFunction({
      defaultTextFunction: defaultTextSelectFunction,
      setFunction: setSizeFunction,
    });

  const {
    setSelectFunction: setSelectHoverFunction,
    selectFunction: selectHoverFunction,
    handleSaveFunction: handleSaveHoverFunction,
  } = useTextFunction({
    defaultTextFunction: defaultHoverFunction,
    setFunction: setHoverFunction,
  });

  return (
    <S.Wrapper>
      <S.Step>Крок 1. Перегляд полів даних</S.Step>
      <ReactJson
        displayDataTypes={false}
        enableClipboard={false}
        src={firstItem}
        collapsed
      />
      <Divider />
      <S.Step>Крок 2. Конфігурація</S.Step>
      <S.SelectWrapper>
        <div>
          Напишіть функцію по якому критерію відбудеться будування теплокарти
        </div>
        <TextArea
          spellCheck={false}
          rows={4}
          placeholder="Напишіть функцію тут"
          onChange={(e) => setSelectFunction(e.target.value)}
          value={selectFunction}
        />
        <Button onClick={handleSaveFunction}>Зберегти функцію</Button>
      </S.SelectWrapper>
      <S.SelectWrapper>
        <div>
          Напишіть функцію по якому буде з`являтися підсказка при наведенні на
          елемент
        </div>
        <TextArea
          spellCheck={false}
          rows={4}
          placeholder="Напишіть функцію тут"
          onChange={(e) => setSelectHoverFunction(e.target.value)}
          value={selectHoverFunction}
        />
        <Button onClick={handleSaveHoverFunction}>Зберегти функцію</Button>
      </S.SelectWrapper>
      <Divider />
      <S.Step>Крок 3. Перегляд</S.Step>
      <div>Спрощена версія</div>
      <S.CloudWrapper>
        <HeatMap
          id="heatmap-demo"
          size={{ height: 600, width: 800 }}
          color={{
            from: 'white',
            to: 'red',
          }}
          data={data}
          hoverFunction={hoverFunction}
          sizeFunction={sizeFunction}
        />
      </S.CloudWrapper>
    </S.Wrapper>
  );
};

SelectData.propTypes = {};

export default SelectData;
