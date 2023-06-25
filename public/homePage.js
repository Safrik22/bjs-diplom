const logoutButton = new LogoutButton();
const ratesBoard = new RatesBoard();
const moneyManager = new MoneyManager();
const favoritesWidget = new FavoritesWidget();

const logoutAction = () => {
  ApiConnector.logout((response) => {
    if (!response.success) {
      return;
    }
    location.reload();
  });
};

const getCurrent = () => {
  ApiConnector.current((response) => {
    if (!response.success) {
      return;
    }
    ProfileWidget.showProfile(response.data);
  });
};

const getStocks = () => {
  ApiConnector.getStocks((response) => {
    if (!response.success) {
      return;
    }
    ratesBoard.clearTable()
    ratesBoard.fillTable(response.data);
  });
};

const addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (response) => {
    if (!response.success) {
      return moneyManager.setMessage(response.success, response.error);
    }
    ProfileWidget.showProfile(response.data);
  });
};

const conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (response) => {
    if (!response.success) {
      return moneyManager.setMessage(response.success, response.error);
    }
    ProfileWidget.showProfile(response.data);
  });
};

const sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, (response) => {
    if (!response.success) {
      return moneyManager.setMessage(response.success, response.error);
    }
    ProfileWidget.showProfile(response.data);
  });
};

const getFavorites = () => {
  ApiConnector.getFavorites((response) => {
    if (!response.success) {
      return;
    }
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  });
};

const addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, (response) => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
    }

    moneyManager.setMessage(response.success, response.error || 'Пользователь успешно добавлен');
  });
};

const removeUserCallback = (data) => {
  ApiConnector.removeUserFromFavorites(data, (response) => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
    }

    moneyManager.setMessage(response.success, response.error || 'Пользователь успешно удален');
  });
};

logoutButton.action = logoutAction;

moneyManager.addMoneyCallback = addMoneyCallback;
moneyManager.conversionMoneyCallback = conversionMoneyCallback;
moneyManager.sendMoneyCallback = sendMoneyCallback;

favoritesWidget.addUserCallback = addUserCallback;
favoritesWidget.removeUserCallback = removeUserCallback;

const onAppInit = () => {
  getFavorites();
  getStocks();
  getCurrent();
  setInterval(getStocks, 60 * 1000);
};

onAppInit();
