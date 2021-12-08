import { LaptopWindowsTwoTone } from "@material-ui/icons";

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
      "Rentable offers a variety of cars for you to rent. These listings are uploaded by our partners. \n To view car listings, please go to https://rentable1.herokuapp.com and click on the Cars tab.",
      {
        widget: "car",
      }
    );
    this.addMessageToState(message);
  };

  handleApartment = () => {
    const message = this.createChatBotMessage(
      "Rentable offers a variety of apartments for you to rent. These listings are uploaded by our partners. \n To view apartment listings, please go to https://rentable1.herokuapp.com and click on the Apartments tab.",
      {
        widget: "apartment",
      }
    );
    this.addMessageToState(message);
  };

  handleService = () => {
    const message = this.createChatBotMessage(
      "Rentable allows you to book a service such as carpet cleaning, vacuuming, car repair, etc. provided by any of our partners. To view listings of services, please go to https://rentable1.herokuapp.com and click on the Services tab.",
      {
        widget: "service",
      }
    );
    this.addMessageToState(message);
  };

  handleContact = () => {
    const message = this.createChatBotMessage(
      "Here is a link to contact the Rentable Support Team:\n https://rentable1.herokuapp.com/contact-us"
    );
    this.addMessageToState(message);
  };

  handleHistory = () => {
    const message = this.createChatBotMessage(
      "Here is a link to view your order history:\n https://rentable1.herokuapp.com/renter-order-history"
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
