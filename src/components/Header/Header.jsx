import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { dataSelector } from '../../recoil/selectors';
import { PAGES } from '../../routes/paths';

import * as S from './Header.styled';

const Header = () => {
  const data = useRecoilValue(dataSelector);

  return (
    <S.Wrapper>
      <S.Logo />
      <Menu mode="horizontal" theme="dark">
        {PAGES.map(({ id, path, title, needData }) => (
          <Menu.Item disabled={needData && !data} key={id}>
            <Link to={path}>{title}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </S.Wrapper>
  );
};

export default Header;
