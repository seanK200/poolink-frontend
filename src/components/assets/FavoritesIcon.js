import React from 'react';
import styled from 'styled-components';
import FavoritesSvg from './FavoritesSvg';

export default function FavoritesIcon({ fill, ...rest }) {
  return <StyledFavoritesIcon {...rest}>{FavoritesSvg}</StyledFavoritesIcon>;
}

const StyledFavoritesIcon = styled.div`
  & svg {
    fill: ${(props) => (props.fill ? props.fill : '#FFD704')};
  }
`;
