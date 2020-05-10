import React, { useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { Alert } from 'react-native';
import api from '~/services/api';

import Background from '~/components/Background';
import { Container, Avatar, Name, Time, SubmitButton } from './styles';

export default function Confirm({ navigation }) {
  const provider = navigation.getParam('provider');
  const time = navigation.getParam('time');

  const timeFormatted = useMemo(
    () =>
      formatRelative(parseISO(time), new Date(), {
        locale: pt,
      }),
    [time]
  );

  async function handleAddAppointment() {
    await api.post('appointments', {
      provider_id: provider.id,
      date: time,
    });

    navigation.navigate('Dashboard');

    Alert.alert('Atenção', 'Agendamento realizado com sucesso!');
  }

  return (
    <Background>
      <Container>
        <Avatar
          source={{
            uri: provider.avatar
              ? provider.avatar.url
              : 'https://api.adorable.io/avatars/50/rocketseat.png ',
          }}
        />

        <Name>{provider.name}</Name>

        <Time>{timeFormatted}</Time>

        <SubmitButton onPress={handleAddAppointment}>
          Confirmar agendamento
        </SubmitButton>
      </Container>
    </Background>
  );
}

Confirm.navigationOptions = ({ navigation }) => ({
  title: 'Confirmar agendamento',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
});
