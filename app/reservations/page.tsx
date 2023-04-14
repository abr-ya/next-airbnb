import getCurrentUser from "../actions/getCurrentUser";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <>не удалось получить пользователя!</>;
  }

  return <h1>{`Reservations of ${currentUser.name}`}</h1>;
};

export default ReservationsPage;
