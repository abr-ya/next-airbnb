import getCurrentUser from "../actions/getCurrentUser";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <>не удалось получить пользователя!</>;
  }

  return <h1>{`Trips of ${currentUser.name}`}</h1>;
};

export default TripsPage;
