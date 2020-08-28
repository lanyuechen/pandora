import React, { useMemo } from 'react';
import { AtSwipeAction } from 'taro-ui';

export default (props: any) => {
  const { onEditClick, onRemoveClick, children, actions = ['remove'] } = props;

  const swipeOption = useMemo(() => [
    {
      key: 'edit',
      text: '',
      style: {
        backgroundColor: '#6190E8',
      },
      className: 'at-icon at-icon-edit',
      onClick: onEditClick
    },
    {
      key: 'remove',
      text: '',
      style: {
        backgroundColor: '#FF4949',
      },
      className: 'at-icon at-icon-trash',
      onClick: onRemoveClick
    }
  ].filter(d => actions.includes(d.key)), [actions]);

  return (
    <AtSwipeAction
      autoClose
      options={swipeOption}
      onClick={(option: any) => option.onClick()}
    >
      {children}
    </AtSwipeAction>
  )
}