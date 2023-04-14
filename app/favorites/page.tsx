import getCurrentUser from "../actions/getCurrentUser";

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <>не удалось получить пользователя!</>;
  }

  return <h1>{`Favorites of ${currentUser.name}`}</h1>;
};

export default FavoritesPage;
