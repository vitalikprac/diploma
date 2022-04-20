import { Menu } from 'antd';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { DataContext } from '../../context/DataContext';
import { PAGES } from '../../routes/paths';

import * as S from './Header.styled';

const Header = () => {
  const { data } = useContext(DataContext);
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
