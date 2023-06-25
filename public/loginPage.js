const userForm = new UserForm();

const loginFormCallback = (data) => {
  ApiConnector.login(data, (response) => {
    if (!response.success) {
      return userForm.setLoginErrorMessage(response.error);
    }

    location.reload();
  });
};

const registerFormCallback = (data) => {
  ApiConnector.register(data, (response) => {
    if (!response.success) {
      return userForm.setRegisterErrorMessage(response.error);
    }
    location.reload();
  });
};

userForm.loginFormCallback = loginFormCallback;
userForm.registerFormCallback = registerFormCallback;
