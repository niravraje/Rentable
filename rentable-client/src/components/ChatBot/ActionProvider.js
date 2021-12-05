// ActionProvider starter code
class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  greet = () => {
    const message = this.createChatBotMessage("Hello Friend.");
    this.addMessageToState(message);
  };

  goodbye = () => {
    const message = this.createChatBotMessage("Goodbye!");
    this.addMessageToState(message);
  };

  handleCar = () => {
    const message = this.createChatBotMessage(
      "Here is information about rental cars ",
      {
        widget: "car",
      }
    );
    this.addMessageToState(message);
  };

  handleApartment = () => {
    const message = this.createChatBotMessage(
      "Here is information about rental apartments ",
      {
        widget: "apartment",
      }
    );
    this.addMessageToState(message);
  };

  handleService = () => {
    const message = this.createChatBotMessage(
      "Here is information about services ",
      {
        widget: "service",
      }
    );
    this.addMessageToState(message);
  };

  handleContact = () => {
    const message = this.createChatBotMessage(
      "Here is a link to the rentable team, https://localhost:3000/contact-us"
    );
    this.addMessageToState(message);
  };

  handleHistory = () => {
    const message = this.createChatBotMessage(
      "Here is a link to view order history, https://localhost:3000/order-history"
    );
    this.addMessageToState(message);
  };

  unknown = () => {
    const message = this.createChatBotMessage(
      "Sorry, I don't understand. Please type something else."
    );
    this.addMessageToState(message);
  };

  addMessageToState = (message) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };
}

export default ActionProvider;
