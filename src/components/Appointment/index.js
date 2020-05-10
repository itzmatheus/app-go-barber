import React, { useMemo } from 'react';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, Left, Avatar, Info, Name, Time } from './styles';

export default function Appointment({ data, onCancel }) {
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.item.date), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.item.date]);

  return (
    <Container past={data.item.past}>
      <Left>
        <Avatar
          source={{
            uri: data.item.provider.avatar
              ? data.item.provider.avatar.url
              : 'https://api.adorable.io/avatars/50/rocketseat.png',
          }}
        />

        <Info>
          <Name>{data.item.provider.name}</Name>
          <Time>{dateParsed}</Time>
        </Info>
      </Left>

      {data.item.cancelable && !data.item.canceled_at && (
        <TouchableOpacity onPress={onCancel}>
          <Icon name="event-busy" size={20} color="#f64c75" />
        </TouchableOpacity>
      )}
    </Container>
  );
}
