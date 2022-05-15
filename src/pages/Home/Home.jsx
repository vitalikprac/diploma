import { Button, Modal, Spin, Tabs } from 'antd';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useSetRecoilState } from 'recoil';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import ErrorFallback from '../../components/ErrorFallback';
import { resetDefault, resetDemo } from '../../utils/resetHelper';
import { cloudMapState } from '../CloudMap/recoil';
import { heatMapState } from '../HeatDemo/recoil';
import { hierarchicalState } from '../HierarchicalEdgeBundling/recoil';

import TableData from './TableData/TableData';
import { viewState } from './recoil';
import UploadFile from './UploadFile';
import * as S from './Home.styled';

const { TabPane } = Tabs;

const Home = () => {
  const handleResetDefault = () => {
    Modal.confirm({
      title: 'Ви дійсно хочете виконати цю дію?',
      icon: <ExclamationCircleOutlined />,
      content:
        'Виставлення усіх нашалтуваня за замовчуванням змінить ваші поточні налаштування. Цю операцію буде неможливо відмінити.',
      onOk() {
        resetDefault();
      },
    });
  };

  const setCloudMapState = useSetRecoilState(cloudMapState);
  const setHeatMapState = useSetRecoilState(heatMapState);
  const setHierarchicalStateState = useSetRecoilState(hierarchicalState);
  const setViewState = useSetRecoilState(viewState);

  const handleResetDemo = () => {
    Modal.confirm({
      title: 'Ви дійсно хочете виконати цю дію?',
      icon: <ExclamationCircleOutlined />,
      content:
        'Виставлення усіх нашалтуваня для демонстрації змінить ваші поточні налаштування. Цю операцію буде неможливо відмінити.',
      onOk() {
        resetDemo({
          setCloudMapState,
          setHeatMapState,
          setHierarchicalStateState,
          setViewState,
        });
      },
    });
  };
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <S.Wrapper defaultActiveKey="1">
        <S.PanicWrapper>
          <S.PanicColumn none>
            <h4>Скидання усіх налаштувань за замовчуванням</h4>
            <Button type="danger" onClick={handleResetDefault}>
              ВИКОНАТИ
            </Button>
          </S.PanicColumn>
          <S.PanicColumn>
            <h4>Виставлення усіх налаштування для демонстрації</h4>
            <Button type="primary" onClick={handleResetDemo}>
              ВИКОНАТИ
            </Button>
          </S.PanicColumn>
        </S.PanicWrapper>
        <TabPane tab="Завантаження даних" key="1">
          <Suspense
            fallback={
              <div>
                <Spin size="large" />
              </div>
            }
          >
            <UploadFile />
          </Suspense>
        </TabPane>
        <TabPane tab="Перегляд даних" key="2">
          <TableData />
        </TabPane>
      </S.Wrapper>
    </ErrorBoundary>
  );
};

export default Home;
