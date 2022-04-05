import { Menu } from 'antd';
import { Link } from 'react-router-dom';

import { PAGES } from '../../routes/paths';

import * as S from './Header.styled';

const Header = () => (
  <S.Wrapper>
    <S.Logo />
    <Menu mode="horizontal" theme="dark">
      {PAGES.map(({ id, path, title }) => (
        <Menu.Item key={id}>
          <Link to={path}>{title}</Link>
        </Menu.Item>
      ))}
    </Menu>
  </S.Wrapper>
);

export default Header;
